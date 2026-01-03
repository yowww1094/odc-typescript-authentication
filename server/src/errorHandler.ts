import type { NextFunction, Request, Response } from "express";

export class AppError extends Error{
    statusCode?: number

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode
    }
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        message: err.message,
    });
    next();
}
