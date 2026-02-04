import { Router } from 'express'
import studentController from '../controller/studentController';
import { validateResource } from '../middleware/validateResource';
import { studentSchema } from '../schema/studentSchema';
import { indexSchema } from '../schema/commonSchema';

const router = Router();

router.route('/').post(validateResource(studentSchema), studentController.createStudent)
router.route('/').get(validateResource(indexSchema), studentController.index)
router.route('/:id').get(studentController.singleStudent).delete(studentController.deleteStudent)

export default router;