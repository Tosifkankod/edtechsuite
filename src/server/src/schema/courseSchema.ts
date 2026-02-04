import z from "zod";

export const createCourseSchema = z.object({
    courseName: z.string().min(3, { message: "Name must be at least 3 characters" }),
    courseFee: z.number().positive({ message: "Course fee must be positive" }),
    courseDuration: z.number().int().positive({ message: "Duration must be positive integer" }),
    courseDescription: z.string().min(10, { message: "Description too short" }),
}).strict();

export const updateCourseSchema = z.object({
    id: z.string(),
    courseName: z.string().min(3, { message: "Name must be at least 3 characters" }).optional(),
    courseFee: z.number().positive({ message: "Course fee must be positive" }).optional(),
    courseDuration: z.number().int().positive({ message: "Duration must be positive integer" }).optional(),
    courseDescription: z.string().min(10, { message: "Description too short" }).optional(),
}).strict();