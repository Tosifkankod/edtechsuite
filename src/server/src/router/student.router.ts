import { Router } from 'express'
import studentController from '../controller/studentController';
import { validateResource } from '../middleware/validateResource';
import { studentSchema } from '../schema/studentSchema';
import { indexSchema } from '../schema/commonSchema';

const router = Router();

router.route('/').post(validateResource(studentSchema), studentController.createCourse)
router.route('/').get(validateResource(indexSchema), studentController.index)

export default router;