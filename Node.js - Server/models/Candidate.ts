import mongoose, { Document, Schema } from 'mongoose';
import { validateString, validateEmail, validatePhone, validateBoolean } from '../utils/validator';

export interface ICandidate extends Document {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  _id:mongoose.Types.ObjectId
}

const CandidateSchema: Schema = new Schema({
  firstName: { type: String, required: true, validate: validateString },
  lastName: { type: String, required: true, validate: validateString },
  emailAddress: { type: String, required: true, validate: validateEmail },
  phoneNumber: { type: String, required: true, validate: validatePhone },

},
{
  versionKey: false,
  _id:true
});

export default mongoose.model<ICandidate>('Candidate', CandidateSchema);
