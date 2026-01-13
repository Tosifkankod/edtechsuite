import { NextFunction, Request } from "express";
import errorObject from "./errorObject";

export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatusCode: number = 500, data: unknown = null): void => {
    const errorObj = errorObject(err, req, errorStatusCode, data);
    return nextFunc(errorObj)
}

