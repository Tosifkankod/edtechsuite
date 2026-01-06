import { Router } from "express";
import courseController from "../controller/courseController";
import { validateResource } from "../middleware/validateResource";
import { createCourseSchema, indexCourseSchema } from "../schema/courseSchema";

const router = Router();

router.route('/').get(validateResource(indexCourseSchema), courseController.index)
router.route('/').post(validateResource(createCourseSchema), courseController.createCourse)

export default router;