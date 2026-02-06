import { AppDataSource } from "../config/data-source";
import responseMessage from "../constant/responseMessage";
import { Trainer } from "../model/Trainer";

const repo = AppDataSource.getRepository(Trainer);
export class TrainerService {
    async findAll() {

    }
    async create(data: Trainer) {
        const model = new Trainer();
        model.address = data.address;
        model.email = data.email;
        model.gender = data.gender;
        model.isActive = data.isActive;
        model.joiningDate = data.joiningDate;
        model.phone = data.phone;
        model.trainerName = data.trainerName;
        return model;
    }

    async findOne(model: { where: any }) {
        return await repo.findOne(model);
    }

    async save(model: Trainer): Promise<Trainer> {
        return await repo.save(model);
    }

    async delete(id: number) {
        const trainer = await repo.findOne({
            where: {
                id: id,
                isDeleted: 0
            }
        })
        if (trainer) {
            trainer.isDeleted = 1;
            const deleted = await repo.save(trainer);
            return deleted;
        }
        throw new Error(responseMessage.NOT_FOUND('student'))
    }

    update(model: Trainer, bodyParams: Partial<Trainer>): Trainer {
        if (bodyParams.gender !== undefined) model.gender = bodyParams.gender;
        if (bodyParams.trainerName !== undefined) model.trainerName = bodyParams.trainerName;
        if (bodyParams.address !== undefined) model.address = bodyParams.address;
        if (bodyParams.email !== undefined) model.email = bodyParams.email;
        if (bodyParams.isActive !== undefined) model.isActive = bodyParams.isActive;
        if (bodyParams.phone !== undefined) model.phone = bodyParams.phone;
        if (bodyParams.joiningDate !== undefined) model.joiningDate = bodyParams.joiningDate;
        return model;
    }

}