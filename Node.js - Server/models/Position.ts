import mongoose, { Document, Schema } from 'mongoose';
import { validateString, validateDate, validateRequirements } from '../utils/validator';
import Application from './Application';

export interface IPosition extends Document {
  name: string;
  location: string;
  date: Date;
  companyDescription: string;
  jobDescription: string;
  requirements: string[];
  _id: mongoose.Types.ObjectId;
}

const PositionSchema: Schema = new Schema({
  name: { type: String, required: true, validate: validateString },
  location: { type: String, required: true, validate: validateString },
  date: { type: Date, required: true, validate: validateDate },
  companyDescription: { type: String, required: true, validate: validateString },
  jobDescription: { type: String, required: true, validate: validateString },
  requirements: {
    type: [String],
    required: true,
    validate: [validateRequirements, 'Invalid requirements'],
  },
},{
  versionKey: false,
  _id: true
});


export default mongoose.model<IPosition>('Position', PositionSchema);
