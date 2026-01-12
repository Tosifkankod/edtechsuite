import { AppDataSource } from "../config/data-source";
import { Student } from "../model/Students";


const repo = AppDataSource.getRepository(Student)

export class StudentService {

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
