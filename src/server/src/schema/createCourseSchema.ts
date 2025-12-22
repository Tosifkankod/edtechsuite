import z from "zod";

export const createCourseSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    slug: z.string().regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase, numbers and hyphens only" }),
    courseFee: z.number().positive({ message: "Course fee must be positive" }),
    courseDuration: z.number().int().positive({ message: "Duration must be positive integer" }),
    courseDescription: z.string().min(10, { message: "Description too short" }),
}).strict();

export type CreateCourseDto = z.infer<typeof createCourseSchema>;