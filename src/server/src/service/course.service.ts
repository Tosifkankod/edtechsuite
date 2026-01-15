import { AppDataSource } from "../config/data-source";
import { Course } from "../model/Course";
import { commonQueryParams } from "../types/types";

const repo = AppDataSource.getRepository(Course);

export class CourseService {

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

    create(data: Course) {
        let model: Course = new Course();
        model.courseName = data.courseName;
        model.courseDescription = data.courseDescription;
        model.courseDuration = data.courseDuration;
        model.courseFee = data.courseFee;
        model.slug = data.slug;
        return model;
    }

    async findOne(course: any) {
        return repo.findOne(course);
    }

    async save(model: Course): Promise<Course> {
        return repo.save(model);
    }

}