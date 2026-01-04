import { AppError } from "./errorHandler.js";
import type { Request, Response, NextFunction } from "express";
import User from "./User.model.js";
import { jwtVerifyUser } from "./jwt.js";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;
    if(!token) throw new AppError("Token is not present!", 401);

    const jwtToken = token.split(" ")[1];
    const decoded = jwtVerifyUser(jwtToken as string);
    if(!decoded) throw new AppError("Token is not present!", 401);
    
    const user = await User.findById(decoded.id);
    if(!user) throw new AppError("Invalid token!", 401);

    const currTime = Date.now() / 1000;
    if (currTime > decoded.exp) throw new AppError("Token Expired!", 401);

    next();
}

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    
}

const isOwner = (req: Request, res: Response, next: NextFunction) => {
    
}

export {
    isAuthenticated,
    isAuthorized,
    isOwner
}
