import express from 'express';
import trainerController from '../controller/trainerController';

const router = express.Router();

router.route('/').get(trainerController.index);

export default router;