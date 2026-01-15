import { NextFunction, Request, Response } from "express"
import httpResponse from "../utils/httpResponse";
import responseMessage from "../constant/responseMessage";
import httpError from "../utils/httpError";
import { CourseService } from "../service/course.service";
import { indexSchema } from "../schema/commonSchema";

const service = new CourseService();
export default {
    index: async (req: Request, res: Response, next: NextFunction) => {
        const query = indexSchema.parse(req.query)
        try {
            const result = await service.findAll(query);
            httpResponse(req, res, 200, responseMessage.SUCCESS, result)
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    createCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;

            const slugExist = await service.findOne({
                where: {
                    slug: body.slug
                }
            })
            console.log(slugExist)

            if (slugExist) {
                return httpError(next, new Error('slug already exist'), req, 401)
            }

            const model = service.create(body)
            const savedModel = await service.save(model);

            if (!savedModel) {
                throw new Error(responseMessage.UNABLE_TO_PROCESS)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, savedModel);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
} 