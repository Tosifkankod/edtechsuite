import { Router } from "express";
import courseController from "../controller/courseController";
import { validateResource } from "../middleware/validateResource";
import { createCourseSchema, updateCourseSchema } from "../schema/courseSchema";
import { indexSchema } from "../schema/commonSchema";

const router = Router();

router.route('/').get(validateResource(indexSchema), courseController.index)
router.route('/').post(validateResource(createCourseSchema), courseController.createCourse)
router.route('/:id').delete(courseController.deleteCourse).get(courseController.singleCourse).patch(validateResource(updateCourseSchema), courseController.updateCourse)

export default router;