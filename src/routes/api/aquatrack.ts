import express from 'express';
import { validateBody, authenticate } from '../../middlewares';
import { dailyWaterRequirementSchema } from '../../models/user';
import { updateWater } from '../../controllers/aquatrack';

const router = express.Router();

router.patch(
  '/daily-water-requirement',
  authenticate,
  validateBody(dailyWaterRequirementSchema),
  updateWater
);

export default router;
