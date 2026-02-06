import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { GenderEnum } from "../types/enums";

@Entity("trainer", { schema: "public" })
@Index("trainer_id_unique", ["id"], { unique: true })
export class Trainer {

    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "course_name" })
    trainerName: string;

    @Column("character varying", { name: "email" })
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

    @Column("timestamp without time zone", { name: "joining_date" })
    joiningDate: string;

    @Column("smallint", { name: "is_deleted", default: () => "0" })
    isDeleted: number;

    @Column("smallint", { name: "is_active", default: () => "1" })
    isActive: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
