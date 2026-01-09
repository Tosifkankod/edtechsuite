import { Router } from 'express'
import courseController from '../controller/courseController';

const router = Router();

router.route('/').post(courseController.createCourse)

export default router;