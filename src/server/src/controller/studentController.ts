import { NextFunction, Request, Response } from "express"
import httpError from "../utils/httpError";
import { StudentService } from "../service/student.service";
import responseMessage from "../constant/responseMessage";
import httpResponse from "../utils/httpResponse";


const service = new StudentService();
export default {
    createCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;

            const studentExist = await service.findOne({
                where: {
                    phone: body.phone
                }
            })

            if (studentExist) {
                return httpError(next, new Error('student already registered'), req, 401, {})
            }

            const model = service.create(body);
            const savedModel = await service.save(model)

            if (!savedModel) {
                throw new Error(responseMessage.UNABLE_TO_PROCESS)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, savedModel);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
} 