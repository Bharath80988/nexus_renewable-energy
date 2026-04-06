import express from 'express';
import { getEnergyData, getForecastData } from '../controllers/energyController.js';

const router = express.Router();

router.get('/energy', getEnergyData);
router.post('/forecast', getForecastData);

export default router;
