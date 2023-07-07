import express from 'express';
import {
  createCandidate,
  updateCandidate,
  getCandidates,
  getCandidateById,
  deleteCandidate,
} from '../controllers/candidateController';

const router = express.Router();
router.post('/', createCandidate);
router.put('/:id', updateCandidate);
router.get('/', getCandidates);
router.get('/:id', getCandidateById);
router.delete('/:id', deleteCandidate);

export default router;
