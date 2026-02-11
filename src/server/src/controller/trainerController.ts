import { NextFunction, Request, Response } from "express";
import httpResponse from "../utils/httpResponse";
import responseMessage from "../constant/responseMessage";
import { TrainerService } from "../service/trainer.service";
import httpError from "../utils/httpError";
import { indexSchema } from "../schema/commonSchema";
import { Trainer } from "../model/Trainer";

const service = new TrainerService();
export default {
    index: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = indexSchema.parse(req.query);
            const result = await service.findAll(query);
            console.log(result)
            httpResponse(req, res, 200, responseMessage.SUCCESS, result)
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    singleTrainer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return httpResponse(req, res, 400, responseMessage.NOT_FOUND('id'))

            const trainer = await service.findOne({
                where: {
                    id: id,
                    isDeleted: 0
                }
            })

            if (!trainer) {
                return httpResponse(req, res, 404, responseMessage.NOT_FOUND('trainer'));
            }

            const formattedData = {
                ...trainer,
                joiningDate: trainer.joiningDate.toISOString().slice(0, 10)
            }


            return httpResponse(req, res, 200, responseMessage.SUCCESS, formattedData);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    createTrainer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;

            const studentExist = await service.findOne({
                where: {
                    phone: body.phone,
                    isDeleted: 0
                }
            })

            if (studentExist) {
                return httpError(next, new Error('trainer already registered'), req, 401, {})
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
    deleteTrainer: async (req: Request, res: Response, next: NextFunction) => {
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
    },
    updateTrainer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return httpResponse(req, res, 400, responseMessage.NOT_FOUND('id not found'));

            const trainer = await service.findOne({
                where: {
                    id: id,
                    isDeleted: 0
                }
            });

            if (!trainer) {
                return httpResponse(req, res, 404, responseMessage.NOT_FOUND('student not found'));
            }

            const body = req.body as Partial<Trainer>
            const newModel = service.update(trainer, body);
            const savedModel = await service.save(newModel);


            if (!savedModel) {
                return httpResponse(req, res, 404, responseMessage.UNABLE_TO_PROCESS);
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, savedModel);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    }
}
