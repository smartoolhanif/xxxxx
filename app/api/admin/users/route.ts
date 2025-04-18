import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { verifyToken, isAdmin } from '@/lib/auth-utils'
import { logEvent } from '@/lib/logger'

export async function GET(request: Request) {
  try {
    // Get authorization token
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Check if user is admin
    const isUserAdmin = await isAdmin(payload.userId)
    if (!isUserAdmin) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Fetch all users with their balances
    const users = await db.collection('users').aggregate([
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          createdAt: 1,
          isAdmin: { $ifNull: ['$isAdmin', false] },
          balance: { $ifNull: ['$balance', 0] },
          lastLogin: 1
        }
      },
      {
        $lookup: {
          from: 'logs',
          localField: '_id',
          foreignField: 'userId',
          as: 'userLogs'
        }
      },
      {
        $addFields: {
          apiCalls: {
            $size: {
              $filter: {
                input: '$userLogs',
                as: 'log',
                cond: { $eq: ['$$log.action', 'api_call'] }
              }
            }
          }
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]).toArray()

    // Log admin action
    await logEvent({
      userId: payload.userId,
      action: 'admin_view_users',
      success: true,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      details: {
        description: 'Admin viewed all users list'
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
} 