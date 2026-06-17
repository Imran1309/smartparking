import { Queue } from 'bullmq';
import { redisClient } from '../config/redis';

// Create a new BullMQ queue using our Redis connection
export const reservationQueue = new Queue('reservationQueue', {
    connection: redisClient as any
});

export const addReservationJob = async (jobName: string, data: any, delay: number = 0) => {
    console.log(`[Queue] Adding job ${jobName} to queue with delay ${delay}ms`);
    
    const job = await reservationQueue.add(jobName, data, {
        delay,
        removeOnComplete: true, // Keep redis clean
        removeOnFail: false
    });

    return { id: job.id };
};
