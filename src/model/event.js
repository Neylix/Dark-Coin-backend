import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dates: {
    begin: Date,
    end: Date
  },
  roles: [
    {
      roleId: mongoose.ObjectId,
      name: String
    }
  ],
  items: [ mongoose.ObjectId ]
});

export default mongoose.model('Event', eventSchema);