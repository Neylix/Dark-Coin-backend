import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  users: [ mongoose.ObjectId ],
  events: [
    {
      eventId: mongoose.ObjectId,
      name: String
    }
  ]
});

export default mongoose.model('Company', companySchema);