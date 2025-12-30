import { AppDataSource } from "../config/data-source";
import { Course } from "../model/Course";

const repo = AppDataSource.getRepository(Course);
export class CourseService {
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

    async update() {

    }
}