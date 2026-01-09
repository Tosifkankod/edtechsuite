import { Router } from "express";
import apiController from "../controller/apiController";
import courseRouter from './course.router';
import studentRouter from './course.router';

const router = Router();

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health)

// course
router.use('/course', courseRouter)
router.use('/student', studentRouter)

export default router;