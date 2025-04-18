import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export enum LogType {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_REGISTER = 'AUTH_REGISTER',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  AUTH_FAILED = 'AUTH_FAILED',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  ONBOARDING_COMPLETE = 'ONBOARDING_COMPLETE',
  ACCESS_ATTEMPT = 'ACCESS_ATTEMPT',
}

type LogData = {
  userId?: string | ObjectId;
  action: LogType;
  details?: any;
  ip?: string;
  userAgent?: string;
  success: boolean;
}

export async function logEvent(data: LogData) {
  try {
    const client = await clientPromise;
    const db = client.db('freefiretools');
    
    // Store the log entry
    await db.collection('auth_logs').insertOne({
      ...data,
      timestamp: new Date()
    });
    
    // For development, also log to console
    console.log(`[LOG] ${data.action}: ${data.success ? 'SUCCESS' : 'FAILURE'}`, {
      userId: data.userId,
      details: data.details,
      timestamp: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Logging error:', error);
    return false;
  }
}

export async function getRecentLogs(userId?: string, limit = 20) {
  try {
    const client = await clientPromise;
    const db = client.db('freefiretools');
    
    const query = userId ? { userId: userId } : {};
    
    const logs = await db.collection('auth_logs')
      .find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
      
    return logs;
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
} 