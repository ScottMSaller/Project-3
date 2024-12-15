import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    q: { type: String, required: true },
  a: { type: String, required: true },
  c: { type: String, required: false },
  h: { type: String, required: false }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Quote', quoteSchema);