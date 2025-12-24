import { AppDataSource } from "../config/data-source";
import { Course } from "../model/Course";

const repo = AppDataSource.getRepository(Course);
export class CourseService {
    async create(data: Partial<Course>) {
        const course = repo.create(data);
        return await repo.save(course);
    }

    async findOne(id: number) {
        const course = await repo.findOneBy({ courseId: id });
        if (!course) throw new Error('Course not found');
        return course;
    }
}