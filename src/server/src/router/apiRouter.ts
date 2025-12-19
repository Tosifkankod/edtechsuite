import { Router } from "express";
import apiController from "../controller/apiController";
import courseController from "../controller/courseController";

const router = Router();

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health)

// course
router.route('/course').post(courseController.createCourse)

export default router;