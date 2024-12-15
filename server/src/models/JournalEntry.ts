import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('JournalEntry', journalEntrySchema);
