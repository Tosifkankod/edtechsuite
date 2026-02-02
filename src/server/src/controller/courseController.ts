import { NextFunction, Request, Response } from "express"
import httpResponse from "../utils/httpResponse";
import responseMessage from "../constant/responseMessage";
import httpError from "../utils/httpError";
import { CourseService } from "../service/course.service";
import { indexSchema } from "../schema/commonSchema";
import { Course } from "../model/Course";

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
    singleCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id ? Number(req.params.id) : -1;

            const result = await service.findOne(id);

            if (!result) {
                return httpResponse(req, res, 404, responseMessage.NOT_FOUND('course not found'));
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, result);

        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    createCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;

            const slugExist = await service.findOne(body.id)

            if (slugExist) {
                return httpError(next, new Error('slug already exist'), req, 401)
            }

            const model = service.create(body)
            const savedModel = await service.save(model);

            if (!savedModel) {
                throw new Error(responseMessage.UNABLE_TO_PROCESS)
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, savedModel);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    deleteCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id ? Number(req.params.id) : -1;

            const isDeleted = await service.delete(id);

            if (isDeleted) {
                return httpResponse(req, res, 200, responseMessage.SUCCESS, isDeleted);
            }

            throw new Error(responseMessage.UNABLE_TO_PROCESS)
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    updateCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return httpResponse(req, res, 400, responseMessage.NOT_FOUND('id not found'));


            const course = await service.findOne(id);
            if (!course) {
                return httpResponse(req, res, 404, responseMessage.NOT_FOUND('course not found'));
            }

            const body = req.body as Partial<Course>;
            if (body.slug && body.slug !== course.slug) {
                const slugTaken = await service.isSlugTaken(body.slug, course.id);
                if (slugTaken) return httpResponse(req, res, 400, responseMessage.VALIDATION_ERROR);
            }

            const updatedCourse = service.update(course, body);

            const savedCourse = await service.save(updatedCourse);;

            return httpResponse(req, res, 200, responseMessage.SUCCESS, savedCourse);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
} 