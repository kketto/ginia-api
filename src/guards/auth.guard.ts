
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function authGuard(req: Request,
    res: Response, next: NextFunction) {
    const token = req.headers.authorization;//?.split(' ')[1];
    if (!token) {
        return res.sendStatus(460);
    }
    const verify = jwt.verify(token, "I'm Perfect") as any;
    if (!verify || verify.role !== 2 && verify.role !== 3) {
        return res.sendStatus(460);
    }
    return next();
};