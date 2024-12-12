import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    savedQuotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quote'}],
    journalEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JournalEntry' }],
});

export default mongoose.model('User', userSchema);