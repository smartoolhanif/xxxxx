import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken, isAdmin } from '@/lib/auth-utils';
import { logEvent } from '@/lib/logger';

export async function GET(request: Request) {
  try {
    // Get authorization token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is admin
    const isUserAdmin = await isAdmin(payload.userId);
    if (!isUserAdmin) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Get query parameters for pagination
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const skip = parseInt(url.searchParams.get('skip') || '0');
    
    // Fetch logs with optional filters
    const logs = await db.collection('logs').aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          timestamp: 1,
          action: 1,
          success: 1,
          ip: 1,
          userAgent: 1,
          details: 1,
          userId: 1,
          username: '$user.username',
          email: '$user.email'
        }
      },
      {
        $sort: { timestamp: -1 }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ]).toArray();

    // Get total count for pagination
    const totalLogs = await db.collection('logs').countDocuments();

    // Log admin action
    await logEvent({
      userId: payload.userId,
      action: 'admin_view_logs',
      success: true,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      details: {
        description: 'Admin viewed system logs'
      }
    });

    return NextResponse.json({ logs, total: totalLogs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
} 