import mongoose, { Document, Schema } from 'mongoose';
import { validatePercentage, validateBoolean } from '../utils/validator';

export interface IApplication extends Document {
  position: mongoose.Types.ObjectId,
  candidate:mongoose.Types.ObjectId
  cognitiveTestScore: number|null;
  personalityTestScore: number|null;
  hasInterview: boolean|null;
  hasReliabilityTest: boolean|null;
  hasTaskPassed: boolean|null;
  hasJobOffer: boolean|null;
  isEmployed: boolean|null;
  totalScore: number|null;
  rating:number
  _id: mongoose.Types.ObjectId;
}

const ApplicationSchema: Schema = new Schema({
  position: { type: mongoose.Types.ObjectId, ref:'Position', required: true },
  candidate: { type: mongoose.Types.ObjectId, ref:'Candidate', required: true },
  cognitiveTestScore: { type: Schema.Types.Mixed,  validate: validatePercentage },
  personalityTestScore: { type: Schema.Types.Mixed,  validate: validatePercentage },
  hasInterview: { type: Schema.Types.Mixed, validate: validateBoolean },
  hasReliabilityTest: { type: Schema.Types.Mixed , validate: validateBoolean},
  hasTaskPassed: { type: Schema.Types.Mixed , validate: validateBoolean },
  hasJobOffer: { type: Schema.Types.Mixed , validate: validateBoolean },
  isEmployed: { type: Schema.Types.Mixed , validate: validateBoolean},
  rating:{type:Schema.Types.Number,required:true  },
  totalScore: { type: Schema.Types.Mixed, validate: validatePercentage},
  
}
,
{
  versionKey: false,
  _id:true
});

export default mongoose.model<IApplication>('Application', ApplicationSchema);
