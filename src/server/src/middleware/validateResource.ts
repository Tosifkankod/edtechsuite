import { Request, Response, NextFunction } from "express";
// import { AnyZodObject } from "zod/v3";
import httpError from "../utils/httpError";
import responseMessage from "../constant/responseMessage";


export const validateResource = (schema: any) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((err: any) => ({
                path: err.path.join('.'),
                message: err.message
            }))
            return httpError(next, new Error(responseMessage.VALIDATION_ERROR), req, 500, errors);
        }

        req.body = result.data;
        next();
    }

}