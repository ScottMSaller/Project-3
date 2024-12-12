import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    text: { type: String, required: true},
    author: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Quote', quoteSchema);