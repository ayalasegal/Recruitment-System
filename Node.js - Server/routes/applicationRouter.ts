import express from 'express';
import {
    createApplication,
    deleteApplication,
    getApplicationById,
    updateApplication,
    getApplications
} from '../controllers/applicationController';

const router = express.Router();

router.post('/', createApplication);
router.put('/:id', updateApplication);
router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.delete('/:id', deleteApplication);

export default router;
