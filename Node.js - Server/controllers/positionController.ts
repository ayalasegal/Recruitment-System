import { Request, Response } from 'express';
import Position, { IPosition } from '../models/Position';
import { generateUniqueId } from '../utils/uuidGenerator';
import Application from '../models/Application';
import mongoose from 'mongoose';
export const createPosition = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      location,
      date,
      companyDescription,
      jobDescription,
      requirements,
    } = req.body;
    const position: IPosition = new Position({
      name,
      location,
      date,
      companyDescription,
      jobDescription,
      requirements,
    });
    const savedPosition = await position.save();
    return res.json(savedPosition);
  } catch (error) {

    return res.status(500).json({ message: 'An error occurred while creating the position.', error });
  }
};

export const updatePosition = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      _id,
      name,
      location,
      date,
      companyDescription,
      jobDescription,
      requirements,
    } = req.body;

    const position = await Position.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        date,
        companyDescription,
        jobDescription,
        requirements,
      },
      { new: true }
    );

    if (!position) {
       return res.status(404).json({ message: 'Position not found.' });
    }

    return res.json(position);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the position.', error });
  }
};

export const getPositions = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const positions = await Position.find();
    return res.json(positions);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the positions.', error });
  }
};

export const getPositionById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) {
       return res.status(404).json({ message: 'Position not found.' });
    }
    return res.json(position);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the position.', error });
  }
};

export const deletePosition = async (req: Request, res: Response): Promise<Response> => {
  try {
    const position = await Position.findByIdAndDelete(req.params.id)
   const applications = await Application.deleteMany({ position: req.params.id });
    if (!position) {
       return res.status(404).json({ message: 'Position not found.' });
    }
    return res.json({ message: 'Position deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while deleting the position.', error });
  }
  
};

export const getPositionAggregateData = async (req: Request, res: Response): Promise<Response> => {
  try {
    const positionId = new mongoose.Types.ObjectId(req.params.positionId);

    const aggregateData = await Application.aggregate([
      { $match: { position: positionId } },
      { $lookup: { from: 'candidates', localField: 'candidate', foreignField: '_id', as: 'candidate' } },
      { $unwind: '$candidate' },
      {
        $group: {
          _id: '$position',
          count: { $sum: 1 },
          averageCognitiveTestScore: { $avg: '$cognitiveTestScore' },
          averagePersonalityTestScore: { $avg: '$personalityTestScore' },
          maxCognitiveTestScore: { $max: '$cognitiveTestScore' },
          maxPersonalityTestScore: { $max: '$personalityTestScore' },
          minCognitiveTestScore: { $min: '$cognitiveTestScore' },
          minPersonalityTestScore: { $min: '$personalityTestScore' },
          passedInterview: { $sum: { $cond: [{ $eq: ['$hasInterview', true] }, 1, 0] } },
          failedInterview: { $sum: { $cond: [{ $eq: ['$hasInterview', false] }, 1, 0] } },
          passedReliabilityTest: { $sum: { $cond: [{ $eq: ['$hasReliabilityTest', true] }, 1, 0] } },
          failedReliabilityTest: { $sum: { $cond: [{ $eq: ['$hasReliabilityTest', false] }, 1, 0] } },
          passedTask: { $sum: { $cond: [{ $eq: ['$hasTaskPassed', true] }, 1, 0] } },
          failedTask: { $sum: { $cond: [{ $eq: ['$hasTaskPassed', false] }, 1, 0] } },
          receivedJobOffer: { $sum: { $cond: [{ $eq: ['$hasJobOffer', true] }, 1, 0] } },
          rejectedJobOffer: { $sum: { $cond: [{ $eq: ['$hasJobOffer', false] }, 1, 0] } },
          employed: { $sum: { $cond: [{ $eq: ['$isEmployed', true] }, 1, 0] } },
          unemployed: { $sum: { $cond: [{ $eq: ['$isEmployed', false] }, 1, 0] } },
          averageRating: { $avg: '$rating' },
          minRating: { $min: '$rating' },
          maxRating: { $max: '$rating' },
          maxTotalScore: { $max: '$totalScore' },
          minTotalScore: { $min: '$totalScore' },
          averageTotalScore: { $avg: '$totalScore' },
        },
      },
    ]);

    if (aggregateData.length === 0) {
      // Return empty array if no data is found for the position
      return res.json([]);
    }

    const result = aggregateData[0];
    delete result._id;

    return res.json(result);
  } catch (error) {
    console.error('Error retrieving position aggregate data:', error);
    return res.status(500).json({ error: 'Error retrieving position aggregate data' });
  }
};

