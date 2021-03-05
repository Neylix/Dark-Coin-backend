import mongoose from 'mongoose';

const transfertStatisticsSchema = new mongoose.Schema({
  eventId: { type: mongoose.ObjectId, required: true},
  addedValue: Number,
  refundValue: Number,
  date: { type: Date, required: true }
});

export default mongoose.model('TransfertStatistics', transfertStatisticsSchema);