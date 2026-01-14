import { Request, Response, NextFunction } from "express";
// import { AnyZodObject } from "zod/v3";
import httpError from "../utils/httpError";
import responseMessage from "../constant/responseMessage";


export const validateResource = (schema: any) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const data = {
            ...req.params,
            ...req.query,
            ...req.body
        }

        const result = schema.safeParse(data);
        if (!result.success) {
            const errors = result.error.issues.reduce(
                (acc: Record<string, string>, err: any) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                },
                {}
            );
            return httpError(next, new Error(responseMessage.VALIDATION_ERROR), req, 400, errors);
        }

        req.body = result.data;
        next();
    }
}