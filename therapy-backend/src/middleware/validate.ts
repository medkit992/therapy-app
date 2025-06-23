// C:\Users\medki\source\repos\therapy-app\therapy-backend\src\middleware\validate.ts
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export function validateBody(dtoClass: any): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObject, { whitelist: true });
        if (errors.length > 0) {
            const messages = flattenErrors(errors);
            res.status(400).json({ errors: messages });
            return;
        }
        req.body = dtoObject;
        next();
    };
}

function flattenErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((err) => {
        if (err.constraints) {
            return Object.values(err.constraints);
        }
        if (err.children) {
            return flattenErrors(err.children);
        }
        return [];
    });
}
