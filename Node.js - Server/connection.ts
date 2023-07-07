import mongoose, { Connection } from 'mongoose';
const url = 'mongodb://0.0.0.0:27017/RecruitmentSystem'
const connectDB = async (): Promise<Connection> => {
  const connection = await mongoose.connect(url!);
  return connection.connection;
};

const database = mongoose.connection;

database.on('error', (error: Error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

export default connectDB;