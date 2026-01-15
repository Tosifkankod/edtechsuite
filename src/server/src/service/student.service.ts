import { AppDataSource } from "../config/data-source";
import { Student } from "../model/Students";
import { commonQueryParams } from "../types/types";


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

    async findOne(student: any) {
        return repo.findOne(student);
    }

    async save(model: Student): Promise<Student> {
        return repo.save(model);
    }

}
