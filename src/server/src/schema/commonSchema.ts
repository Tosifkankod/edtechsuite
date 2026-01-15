import z from "zod"

export const indexSchema = z.object({
    page: z.string().optional().default("1").transform(Number).refine((v) => !v || v > 0, { message: "Page must be positive" }).transform(Number),
    limit: z.string().optional().default("10").transform(Number).refine((v) => !v || v > 0, { message: "Limit must be positive" }),
    sortBy: z.string().optional().default("createdAt"),
    order: z.enum(['ASC', 'DESC']).optional().default('DESC'),
    search: z.string().optional().default("")
}).strict()

