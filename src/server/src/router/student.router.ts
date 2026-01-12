import { Router } from 'express'
import studentController from '../controller/studentController';
import { validateResource } from '../middleware/validateResource';
import { studentSchema } from '../schema/studentSchema';

const router = Router();

router.route('/').post(validateResource(studentSchema), studentController.createCourse)

export default router;