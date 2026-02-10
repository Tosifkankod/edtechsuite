import express from 'express';
import trainerController from '../controller/trainerController';
import { validateResource } from '../middleware/validateResource';
import { trainerSchema } from '../schema/trainerSchema';
import { indexSchema } from '../schema/commonSchema';

const router = express.Router();

router.route('/').get(validateResource(indexSchema), trainerController.index)
router.route('/').post(validateResource(trainerSchema), trainerController.createTrainer)
router.route('/:id').delete(trainerController.deleteTrainer).patch(trainerController.updateTrainer)

export default router;