import mongoose from 'mongoose';

const itemStatisticsSchema = new mongoose.Schema({
  eventId: { type: mongoose.ObjectId, required: true},
  itemId: { type: mongoose.ObjectId, required: true},
  roleId: mongoose.ObjectId,
  quantity: { type: Number, required: true },
  date: { type: Date, required: true }
});

export default mongoose.model('ItemStatistics', itemStatisticsSchema);