import { Router } from "express";
import apiController from "../controller/apiController";
import courseRouter from './course.router';
import studentRouter from './student.router';
import trainerRouter from './trainer.router';
import authRouter from './auth.router';

const router = Router();

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health)

// course
router.use('/course', courseRouter)
router.use('/student', studentRouter)
router.use('/trainer', trainerRouter)
router.use('/auth', authRouter)

export default router;