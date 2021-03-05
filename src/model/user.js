import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  companyId: { type: mongoose.ObjectId, required: true },
  username: { type: String, required: true},
  password: { type: String, required: true }
});

// define indexe unique for both companyId and username
userSchema.index(
  { companyId: 1, username: 1 },
  { unique: true }
);

export default mongoose.model('User', userSchema);