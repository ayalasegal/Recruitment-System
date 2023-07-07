import validator from 'validator';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Request } from 'express';
import Job from '../models/Position';

const phoneUtil = PhoneNumberUtil.getInstance();

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validatePhone = (phone: string): boolean => {
  try {
    const phoneNumber = phoneUtil.parse(phone, 'IL');
    return phoneUtil.isValidNumber(phoneNumber);
  } catch (error) {
    return false;
  }
};

export const validateString = (value: string): boolean => {
  return !validator.isEmpty(value);
};

export const validatePercentage = (percentage: number): boolean => {
  return percentage >= 0 && percentage <= 100;
};

export const validateBoolean = (value: boolean): boolean => {
  return value == null || typeof value === 'boolean';
};

export const validateDate = (date: string): boolean => {
  return validator.isDate(date);
};

export const validateRequirements = (requirements: string[]): boolean => {
  return requirements.every((requirement) => typeof requirement === 'string' && validateString(requirement));
};

export const validateCandidateBody = (req: Request): boolean => {
  const {
    _id,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    isEmployed,
  } = req.body;

  return (
    validateString(firstName) &&
    validateString(lastName) &&
    validateEmail(emailAddress) &&
    validatePhone(phoneNumber) &&
    validateBoolean(isEmployed) 
  );
};

export const validatePositionBody = (req: Request)=> {
  const { _id , name, location, date, companyDescription, jobDescription, requirements } = req.body;

  return (
    validateString(name) &&
    validateString(location) &&
    validateDate(date) &&
    validateString(companyDescription) &&
    validateString(jobDescription) &&
    validateRequirements(requirements)
  );
};

export const validateApplicationBody = (req: Request)=> {
  const { _id , position, candidate, cognitiveTestScore, personalityTestScore, hasInterview, hasReliabilityTest, hasTaskPassed,hasJobOffer, totalScore } = req.body;

  return (
    validatePositionBody(position)&&
    validateCandidateBody(candidate)
    // &&validatePercentage(cognitiveTestScore)&&
    // validatePercentage(personalityTestScore)&&
    // validateBoolean(hasReliabilityTest)&&
    // validateBoolean(hasTaskPassed)&&
    // validateBoolean(hasJobOffer)&&
    // validatePercentage(totalScore)
  );
};

