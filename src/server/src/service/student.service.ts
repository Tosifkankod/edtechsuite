import { AppDataSource } from "../config/data-source";
import { Student } from "../model/Students";
import { commonQueryParams } from "../types/types";
import responseMessage from "../constant/responseMessage";


const repo = AppDataSource.getRepository(Student)

export class StudentService {

    async findAll(params: commonQueryParams) {
        const { sortBy, page, limit, order } = params;

        const qb = repo.createQueryBuilder('student');

        // sort by
        qb.orderBy(`student.${sortBy}`, order)
        qb.skip((page - 1) * limit).take(limit)

        const [data, total] = await qb.getManyAndCount();
        return {
            students: data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };

    }
    create(data: Student) {
        let model: Student = new Student();
        model.studentName = data.studentName;
        model.address = data.address;
        model.email = data.email;
        model.gender = data.gender;
        model.phone = data.phone;
        model.employmentStatus = data.employmentStatus;
        return model;
    }
    async findOne(student: { where: any }) {
        return repo.findOne(student);
    }
    async save(model: Student): Promise<Student> {
        return repo.save(model);
    }
    async delete(id: number) {
        const student = await repo.findOne({
            where: {
                id: id,
                isDeleted: 0
            }
        })

        if (student) {
            student.isDeleted = 1;
            const deleted = await repo.save(student);
            return deleted;
        }
        throw new Error(responseMessage.UNABLE_TO_PROCESS)
    }

}
