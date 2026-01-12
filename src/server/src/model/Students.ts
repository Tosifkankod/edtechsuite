import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmploymentStatusEnum, GenderEnum } from "../types/enums";

@Entity("student", { schema: "public" })
@Index("student_id_unique", ['studentId'], { unique: true })
export class Student {
    @PrimaryGeneratedColumn({ type: "integer", name: "course_id" })
    studentId: number;

    @Column("character varying", { name: "student_name" })
    studentName: string;

    @Column('character varying', { name: "email" })
    email: string;

    @Column("character varying", { name: "phone" })
    phone: string;

    @Column("character varying", { name: "address", nullable: true })
    address: string;

    /**
     * M - male
     * F - female
     * O - others
     */
    @Column("enum", { name: "gender", enum: GenderEnum, default: GenderEnum.M })
    gender: GenderEnum;

    /**
     * W - working
     * S - student
    */
    @Column("enum", {
        name: "employment_status",
        enum: EmploymentStatusEnum,
        default: EmploymentStatusEnum.S,
    })
    employmentStatus: EmploymentStatusEnum;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}