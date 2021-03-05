import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  companyId: { type: mongoose.ObjectId, required: true },
  name: { type: String, required: true },
  fonction: { type: String, required: true },
  items: [ mongoose.ObjectId ]
});

// define indexe unique for both companyId and name
roleSchema.index(
  { companyId: 1, name: 1 },
  { unique: true }
);

export default mongoose.model('Role', roleSchema);