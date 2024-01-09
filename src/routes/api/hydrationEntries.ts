import express from 'express';
import { authenticate, validateBody, isValidId } from '../../middlewares';
import {
  add,
  getById,
  updateById,
  deleteById,
  getTodaysProgress,
  getMonthProgress,
} from '../../controllers/hydrationEntries';
import { addHydrationEntrySchema } from '../../models/hydrationEntry';
import { notEmptyBodySchema } from '../../schemas';

const router = express.Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(notEmptyBodySchema),
  validateBody(addHydrationEntrySchema),
  add
);
router.get('/today', getTodaysProgress);
router.get('/month-progress', getMonthProgress);
router.get('/:entryId', isValidId, getById);
router.put(
  '/:entryId',
  isValidId,
  validateBody(notEmptyBodySchema),
  updateById
);
router.delete('/:entryId', isValidId, deleteById);

export default router;
