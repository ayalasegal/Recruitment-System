import { Request, Response } from 'express';
import Application, { IApplication } from '../models/Application';
export const createApplication = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
        position,
        candidate,
        cognitiveTestScore,
        personalityTestScore,
        hasInterview,
        hasReliabilityTest,
        hasTaskPassed,
        hasJobOffer,
        isEmployed,
        rating,
        totalScore
    } = req.body;
    const application: IApplication = new Application({
        position,
        candidate,
        cognitiveTestScore,
        personalityTestScore,
        hasInterview,
        hasReliabilityTest,
        hasTaskPassed,
        hasJobOffer,
        isEmployed,
        rating,
        totalScore
    });
    const savedApplication = await application.save();
    return res.json(savedApplication);
  } catch (error) {

    return res.status(500).json({ message: 'An error occurred while creating the application.', error });
  }
};

export const updateApplication = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
        position,
        candidate,
        cognitiveTestScore,
        personalityTestScore,
        hasInterview,
        hasReliabilityTest,
        hasTaskPassed,
        hasJobOffer,
        isEmployed,
        rating,
        totalScore,
      _id
    } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        position,
        candidate,
        cognitiveTestScore,
        personalityTestScore,
        hasInterview,
        hasReliabilityTest,
        hasTaskPassed,
        hasJobOffer,
        isEmployed,
        totalScore,
        rating,
        _id
      },
      { new: true }
    );

    if (!application) {
       return res.status(404).json({ message: 'Application not found.' });
    }

    return res.json(application);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the application.', error });
  }
};

export const getApplications = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const applications = await Application.find();
    return res.json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the applications.', error });
  }
};

export const getApplicationById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
       return res.status(404).json({ message: 'Application not found.' });
    }
    return res.json(application);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the application.', error });
  }
};

export const deleteApplication = async (req: Request, res: Response): Promise<Response> => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
       return res.status(404).json({ message: 'Application not found.' });
    }
    return res.json({ message: 'Application deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while deleting the application.', error });
  }
};
