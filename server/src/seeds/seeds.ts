import mongoose from 'mongoose';
import User from '../models/User';
import Quote from '../models/Quote';
import JournalEntry from '../models/JournalEntry';
import dotenv from 'dotenv';
dotenv.config();

const seedDatabase = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://ssaller:0Ld$alty1@clusteryuck.d6lg3.mongodb.net/?retryWrites=true&w=majority&appName=ClusterYuck';
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }
        await mongoose.connect(mongoUri);
        console.log('Database connected');

        await User.deleteMany({});
        await Quote.deleteMany({});
        await JournalEntry.deleteMany({});
        console.log('Existing data cleared');

        const users = await User.insertMany([
            {
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                email: 'john@example.com',
                password: 'cheese',
                savedQuotes: [],
                journalEntries: [],
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                username: 'janesmith',
                password: 'cheese',
                email: 'jane@example.com',
                savedQuotes: [],
                journalEntries: [],
            },
        ]);
        console.log('Users seeded:', users);

        const quotes = await Quote.insertMany([
            { text: 'The only limit is the one you set yourself.', author: 'Anonymous', user: users[0]._id },
            { text: 'Success is not final; failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill', user: users[1]._id },
        ]);
        console.log('Quotes seeded:', quotes);

        const journalEntries = await JournalEntry.insertMany([
            {
                title: 'My First Journal Entry',
                content: 'Today I started using this journaling app.',
                date: new Date().toISOString(),
                user: users[0]._id,
            },
            {
                title: 'Thoughts on Life',
                content: 'Life is beautiful and full of opportunities.',
                date: new Date().toISOString(),
                user: users[1]._id,
            },
        ]);
        console.log('Journal entries seeded:', journalEntries);

        users[0].savedQuotes.push(quotes[0]._id);
        users[1].savedQuotes.push(quotes[1]._id);

        users[0].journalEntries.push(journalEntries[0]._id);
        users[1].journalEntries.push(journalEntries[1]._id);

        await users[0].save();
        await users[1].save();
        console.log('Quotes associated with users');

        console.log('Database seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDatabase();
