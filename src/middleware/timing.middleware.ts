import { Request, Response, NextFunction } from 'express';

export const timingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const duration = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    console.log(`[Timing] ${req.method} ${req.originalUrl} took ${duration}ms`);
  });

  next();
};
