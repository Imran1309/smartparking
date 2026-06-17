import { Worker, Job } from 'bullmq';
import { redisClient } from '../config/redis';

const processJob = async (job: Job) => {
    switch(job.name) {
        case 'sendConfirmationEmail':
            console.log(`[Worker] Sending confirmation email for reservation ${job.data.reservationId} to ${job.data.email}`);
            // Simulate sending email
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`[Worker] Email sent to ${job.data.email}`);
            break;
            
        case 'expireReservation':
            console.log(`[Worker] Checking expiration for reservation ${job.data.reservationId}`);
            // Logic to check if user checked in, and if not, free up the spot
            break;
            
        default:
            console.warn(`[Worker] Unknown job name: ${job.name}`);
    }
};

// Create the worker listening to the 'reservationQueue'
export const reservationWorker = new Worker('reservationQueue', processJob, {
    connection: redisClient as any
});

reservationWorker.on('completed', job => {
    console.log(`[Worker] Job ${job.id} has completed!`);
});

reservationWorker.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job?.id} has failed with ${err.message}`);
});
