import { NextFunction, Request, Response } from "express"
import httpError from "../utils/httpError";

export default {
    index: async (req: Request, res: Response, next: NextFunction) => {

    },
    createCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
} 