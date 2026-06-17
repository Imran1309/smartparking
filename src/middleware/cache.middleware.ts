import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../config/redis';

export const cacheMiddleware = (keyPrefix: string, ttlSeconds: number = 60) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Generate a cache key based on prefix and request URL
            const cacheKey = `${keyPrefix}:${req.originalUrl}`;
            
            // Check if we have cached data
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                console.log(`[Cache] HIT for ${cacheKey}`);
                res.status(200).json(JSON.parse(cachedData));
                return;
            }

            console.log(`[Cache] MISS for ${cacheKey}`);
            
            // Override res.json to intercept the response and cache it
            const originalJson = res.json.bind(res);
            res.json = (body: any) => {
                // Only cache successful responses
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    redisClient.set(cacheKey, JSON.stringify(body), 'EX', ttlSeconds).catch(err => {
                        console.error('[Cache] Error setting cache:', err);
                    });
                }
                return originalJson(body);
            };

            next();
        } catch (error) {
            console.error('[Cache] Middleware Error:', error);
            next(); // Proceed without cache if there's a Redis error
        }
    };
};

// Helper function to clear cache by prefix
export const invalidateCache = async (keyPrefix: string) => {
    try {
        const keys = await redisClient.keys(`${keyPrefix}:*`);
        if (keys.length > 0) {
            await redisClient.del(...keys);
            console.log(`[Cache] Invalidated ${keys.length} keys for prefix ${keyPrefix}`);
        }
    } catch (error) {
        console.error('[Cache] Error invalidating cache:', error);
    }
};
