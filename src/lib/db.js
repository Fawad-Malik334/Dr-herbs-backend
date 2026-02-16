import mongoose from 'mongoose';

export const connectDb = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return false;
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  return true;
};
