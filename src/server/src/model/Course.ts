import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("course", { schema: "public" })
@Index("courses_id_unique", ["id"], { unique: true })
export class Course {

    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "course_name" })
    courseName: string;

    @Column("integer", { name: "course_fee" })
    courseFee: number;

    @Column("integer", { name: "course_duration" })
    courseDuration: number;

    @Column("character varying", { name: "course_description" })
    courseDescription: string;

    @Column("smallint", { name: "is_deleted", default: () => "0" })
    isDeleted: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
