import { Router } from "express";
import courseController from "../controller/courseController";
import { validateResource } from "../middleware/validateResource";
import { createCourseSchema } from "../schema/createCourseSchema";

const router = Router();

router.route('/').post(validateResource(createCourseSchema), courseController.createCourse)

export default router;