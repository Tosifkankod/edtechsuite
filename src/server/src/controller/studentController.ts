import { NextFunction, Request, Response } from "express"
import httpError from "../utils/httpError";
import { StudentService } from "../service/student.service";
import responseMessage from "../constant/responseMessage";
import httpResponse from "../utils/httpResponse";
import { indexSchema } from "../schema/commonSchema";


const service = new StudentService();
export default {
    index: async (req: Request, res: Response, next: NextFunction) => {

        const query = indexSchema.parse(req.query);
        try {
            const result = await service.findAll(query);
            console.log(result)
            httpResponse(req, res, 200, responseMessage.SUCCESS, result)
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    singleCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return httpResponse(req, res, 400, responseMessage.NOT_FOUND('id not found'));

            const student = await service.findOne({
                where: {
                    id: id,
                    isDeleted: 0
                }
            });

            if (!student) {
                return httpResponse(req, res, 404, responseMessage.NOT_FOUND('student not found'));
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, student);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
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
    deleteCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return httpResponse(req, res, 400, responseMessage.NOT_FOUND('id not found'));

            const isDeleted = await service.delete(id);

            if (!isDeleted) {
                throw new Error(responseMessage.UNABLE_TO_PROCESS)
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, isDeleted);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    }
} 