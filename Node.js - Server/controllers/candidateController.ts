import { Request, Response } from 'express';
import Candidate, { ICandidate } from '../models/Candidate';
import { generateUniqueId } from '../utils/uuidGenerator';
import Application from '../models/Application';
export const createCandidate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
    } = req.body;

    const candidate: ICandidate = new Candidate({
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
    });
    const savedCandidate = await candidate.save();
    return res.json(savedCandidate);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while creating the candidate.', error });
  }
};

export const updateCandidate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      _id,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
    } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      {
        _id,
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
      },
      { new: true }
    );

    if (!candidate) {
       return res.status(404).json({ message: 'Candidate not found.' });
    }

    return res.json(candidate);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the candidate.', error });
  }
};

export const getCandidates = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const candidates = await Candidate.find();
    return res.json(candidates);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the candidates.', error });
  }
};

export const getCandidateById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
       return res.status(404).json({ message: 'Candidate not found.' });
    }
    return res.json(candidate);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the candidate.', error });
  }
};

export const deleteCandidate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    const applications = await Application.deleteMany({ candidate: req.params.id });

    if (!candidate) {
       return res.status(404).json({ message: 'Candidate not found.' });
    }
   return res.json({ message: 'Candidate deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while deleting the candidate.', error });
  }
};
