import mongoose from "mongoose";
import JournalEntry from "../models/JournalEntry";
import Quote from "../models/Quote";
import User from "../models/User";

const resolvers = {
    Query: {
        users: async () => {
            try {
                return await User.find();
            } catch (err) {
                throw new Error(`Failed to fetch users: ${err}`);
            }
        },
        user: async (_parent: any, { id }: { id: string }) => {
            try {
                return await User.findById(id);
            } catch (err) {
                throw new Error(`Failed to fetch user: ${err}`);
            }
        },
        quotes: async () => {
            try {
                return await Quote.find();
            } catch (err) {
                throw new Error(`Failed to fetch quotes: ${err}`);
            }
        },
        quotesByUser: async (_parent: any, { userId }: { userId: string }) => {
            try {
                const user = await User.findById(userId).populate({
                    path: 'savedQuotes',
                    model: 'Quote',
                });
                if (!user) throw new Error('User not found');
                return user.savedQuotes;
            } catch (err) {
                throw new Error(`Failed to fetch quotes by user: ${err}`);
            }
        },
        journalEntries: async () => {
            try {
                return await JournalEntry.find();
            } catch (err) {
                throw new Error(`Failed to fetch journal entries: ${err}`);
            }
        },
        journalEntriesByUser: async (_parent: any, { userId }: { userId: string }) => {
            console.log(userId);
            try {
                const user = await User.findById(userId).populate({
                    path: 'journalEntries',
                    model: 'JournalEntry',
                });
                if (!user) throw new Error('User not found');
                return user.journalEntries;
            } catch (err) {
                throw new Error(`Failed to fetch journal entries for user: ${err}`);
            }
        },        
    },
    Mutation: {
        addQuote: async (_parent: any, { text, author, userId }: { text: string; author: string; userId: string }) => {
            try {
                const user = await User.findById(userId);
                if (!user) throw new Error('User not found');
        
                const newQuote = new Quote({ text, author, user: userId });
                const savedQuote = await newQuote.save();
        
                user.savedQuotes.push(savedQuote._id);
                await user.save();
        
                return savedQuote;
            } catch (err) {
                throw new Error(`Failed to add quote: ${err}`);
            }
        },
        saveQuote: async (_parent: any, { userId, quoteId }: { userId: string; quoteId: string }) => {
            try {
                const user = await User.findById(userId);
                const quote = await Quote.findById(quoteId);

                if (!user || !quote) throw new Error("User or Quote not found");

                if (!user.savedQuotes.includes(new mongoose.Types.ObjectId(quoteId))) {
                    user.savedQuotes.push(new mongoose.Types.ObjectId(quoteId));
                    await user.save();
                }

                return user;
            } catch (err) {
                throw new Error(`Failed to save quote: ${err}`);
            }
        },
        addJournalEntry: async (_parent: any, { userId, title, content, date }: { userId: string; title: string; content: string; date: string }) => {
            try {
              const user = await User.findByIdAndUpdate(userId, {
                $push: { journalentries: { title, content, date } },
                new: true,
              });
          
              if (!user) throw new Error("User not found");
          
              return user.journalEntries[user.journalEntries.length - 1];
            } catch (err) {
              throw new Error(`Failed to add journal entry: ${err}`);
            }
          },
    },
}

export default resolvers;
