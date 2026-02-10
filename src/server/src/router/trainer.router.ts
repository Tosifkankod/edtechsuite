import express from 'express';
import trainerController from '../controller/trainerController';
import { validateResource } from '../middleware/validateResource';
import { trainerSchema } from '../schema/trainerSchema';

const router = express.Router();

router.route('/').get(trainerController.index).post(validateResource(trainerSchema), trainerController.createTrainer)

export default router;