import z from "zod";
import { GenderEnum } from "../types/enums";

export const trainerSchema = z.object({
    trainerName: z.string().min(3, { message: "student Name must be 3 characters long" }),
    email: z.email(),
    phone: z.string().min(10, { message: "phone number should be 10 digits" }).max(10, { message: "phone number should be 10 digits" }),
    address: z.string().optional(),
    gender: z.enum(GenderEnum).default(GenderEnum.M),
    joiningDate: z.coerce.date()
}) 
