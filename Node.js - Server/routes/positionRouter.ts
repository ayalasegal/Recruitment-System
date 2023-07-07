import express from 'express';
import {
  createPosition,
  updatePosition,
  getPositions,
  getPositionById,
  deletePosition,
  getPositionAggregateData,
} from '../controllers/positionController';

const router = express.Router();

router.post('/', createPosition);
router.put('/:id', updatePosition);
router.get('/', getPositions);
router.get('/:id', getPositionById);
router.delete('/:id', deletePosition);
router.get('/:positionId/aggregate', getPositionAggregateData); // Add this line

export default router;
