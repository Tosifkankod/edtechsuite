import { NextFunction, Request, Response } from "express"
import httpResponse from "../utils/httpResponse";
import responseMessage from "../constant/responseMessage";
import httpError from "../utils/httpError";


export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            throw new Error('this is error');
            httpResponse(req, res, 200, responseMessage.SUCCESS, { id: "i123" });
        } catch (error) {
            httpError(next, error, req, 500);
        }
    }
}