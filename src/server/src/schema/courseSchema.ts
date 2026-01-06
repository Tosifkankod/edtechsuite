import z from "zod";

export const createCourseSchema = z.object({
    courseName: z.string().min(3, { message: "Name must be at least 3 characters" }),
    slug: z.string().regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase, numbers and hyphens only" }),
    courseFee: z.number().positive({ message: "Course fee must be positive" }),
    courseDuration: z.number().int().positive({ message: "Duration must be positive integer" }),
    courseDescription: z.string().min(10, { message: "Description too short" }),
}).strict();

export const indexCourseSchema = z.object({
    page: z.string().optional().default("1").transform(Number).refine((v) => !v || v > 0, { message: "Page must be positive" }).transform(Number),
    limit: z.string().optional().default("10").transform(Number).refine((v) => !v || v > 0, { message: "Limit must be positive" }),
    sortBy: z.string().optional().default("createdAt"),
    order: z.enum(['ASC', 'DESC']).optional().default('DESC'),
    search: z.string().optional().default("")
}).strict()
