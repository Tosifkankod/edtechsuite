import { Router } from "express";
import apiController from "../controller/apiController";
import courseController from "../controller/courseController";
import { validateResource } from "../middleware/validateResource";
import { createCourseSchema } from "../schema/createCourseSchema";

const router = Router();

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health)

// course
router.route('/course').post(validateResource(createCourseSchema), courseController.createCourse)

export default router;