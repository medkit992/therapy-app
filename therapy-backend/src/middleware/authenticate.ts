// therapy-backend/src/middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "replace_with_env_secret";

export interface AuthRequest extends Request {
    user?: { userId: string; email: string };
}

export function authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Missing or invalid token" });
        return;
    }
    const token = header.slice(7);
    try {
        const payload = jwt.verify(token, JWT_SECRET) as {
            userId: string;
            email: string;
        };
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}
