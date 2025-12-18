import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("course", { schema: "public" })
@Index("course_slug_unique", ["slug"], { unique: true })
export class Course {

    @PrimaryGeneratedColumn({ type: "integer", name: "course_id" })
    courseId: number;

    @Column("character varying", { name: "name" })
    name: string;

    @Column("character varying", { name: "slug" })
    slug: string;

    @Column("integer", { name: "course_fee" })
    courseFee: number;

    @Column("integer", { name: "course_duration" })
    courseDuration: number;

    @Column("character varying", { name: "course_description" })
    courseDescription: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
