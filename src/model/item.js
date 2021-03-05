import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  companyId: {type: mongoose.ObjectId, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

export default mongoose.model('Item', itemSchema);