import { NextFunction, Request, Response } from "express"
import httpError from "../utils/httpError";
import responseMessage from "../constant/responseMessage";
import httpResponse from "../utils/httpResponse";


export default {
    index: async (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                success: true
            })
        } catch (error) {
            httpError(next, error, req, 500);
        }
    }
}   