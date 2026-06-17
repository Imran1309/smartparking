import Redis from 'ioredis';

// Create a Redis client
// Make sure you have Redis running on the default port 6379 or update the REDIS_URL in .env
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// We reuse the same connection to avoid multiple connections
export const redisClient = new Redis(redisUrl, {
  maxRetriesPerRequest: null, // Required by BullMQ
  enableReadyCheck: false
});

redisClient.on('error', (error) => {
  console.error('[Redis] Connection Error:', error);
});

redisClient.on('connect', () => {
  console.log('[Redis] Connected to Redis server.');
});

export default redisClient;
