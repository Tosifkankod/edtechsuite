import { AppDataSource } from "../config/data-source";
import responseMessage from "../constant/responseMessage";
import { Course } from "../model/Course";
import { commonQueryParams } from "../types/types";

const repo = AppDataSource.getRepository(Course);

export class CourseService {

    // CREATE
    create(data: Course) {
        let model: Course = new Course();
        model.courseName = data.courseName;
        model.courseDescription = data.courseDescription;
        model.courseDuration = data.courseDuration;
        model.courseFee = data.courseFee;
        return model;
    }

    // READ
    async findAll(params: commonQueryParams) {
        const { page, limit, search, sortBy, order } = params;

        const qb = repo.createQueryBuilder('course');

        // global Search
        if (search) {
            qb.andWhere(`
                course.courseName ILIKE :search
                OR course.courseDescription ILIKE :search
                OR course.slug ILIKE :search`, { search: search })
        }

        qb.where("course.isDeleted = 0")

        // sorting
        qb.orderBy(`course.${sortBy}`, order);

        qb.skip((page - 1) * limit).take(limit)

        const [data, total] = await qb.getManyAndCount();
        return {
            courses: data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // READ ONE
    async findOne(id: number) {
        return repo.findOne({
            where: {
                id: id,
                isDeleted: 0
            }
        });
    }

    // DELETE
    async delete(id: number) {
        const course = await repo.findOne({
            where: {
                id: id,
                isDeleted: 0
            }
        })

        if (course) {
            course.isDeleted = 1;
            const deleted = await this.save(course);
            return deleted;
        }

        throw new Error(responseMessage.UNABLE_TO_PROCESS)
    }

    // UPDATE
    update(model: Course, bodyParams: Partial<Course>): Course {
        if (bodyParams.courseDescription !== undefined) model.courseDescription = bodyParams.courseDescription;
        if (bodyParams.courseDuration !== undefined) model.courseDuration = bodyParams.courseDuration;
        if (bodyParams.courseFee !== undefined) model.courseFee = bodyParams.courseFee;
        if (bodyParams.courseName !== undefined) model.courseName = bodyParams.courseName;
        return model;
    }

    async save(model: Course): Promise<Course> {
        console.log(model.id)
        return repo.save(model);
    }
}