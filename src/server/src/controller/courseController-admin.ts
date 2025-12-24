import { NextFunction, Request, Response } from "express"
import httpResponse from "../utils/httpResponse";
import responseMessage from "../constant/responseMessage";
import httpError from "../utils/httpError";
import { Course } from "../model/Course";


export default {
    createCourse: (req: Request, res: Response, next: NextFunction) => {
        try {
            

            httpResponse(req, res, 200, responseMessage.SUCCESS, req.body);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
}