import mongoose from "mongoose";
import JournalEntry from "../models/JournalEntry";
import Quote from "../models/Quote";
import User from "../models/User";
import bcrypt from 'bcrypt';
import { DateScalar } from "../util/DateScalar";
import logger from "../util/logger";
import { generateToken } from "../util/jwt";

const isAuthenticated = (context: any) => {
  if (!context.user) {
    throw new Error('Not authenticated');
  }
};

const resolvers = {
  Date: DateScalar,

  Query: {
    users: async (_parent: any, _args: any, context: any) => {
      isAuthenticated(context);
      try {
        return await User.find();
      } catch (error) {
        logger.error(`Error in getUser resolver: ${error}`);
        throw new Error('Failed to fetch users');
      }
    },
    user: async (_parent: any, { id }: { id: string }, context: any) => {
      isAuthenticated(context);
      try {
        return await User.findById(id);
      } catch (error) {
        logger.error(`Error in getUser resolver: ${error}`);
        throw new Error('Failed to fetch user');
      }
    },
    quotes: async (_parent: any, _args: any, context: any) => {
      isAuthenticated(context);
      try {
        return await Quote.find();
      } catch (error) {
        logger.error(`Error in getQuotes resolver: ${error}`);
        throw new Error('Failed to fetch quotes');
      }
    },
    quotesByUser: async (_parent: any, { userId }: { userId: string }, context: any) => {
      isAuthenticated(context);
      try {
        const user = await User.findById(userId).populate({
          path: 'savedQuotes',
          model: 'Quote',
        });
        if (!user) throw new Error('User not found');
        return user.savedQuotes;
      } catch (error) {
        logger.error(`Error in getQuotesByUser resolver: ${error}`);
        throw new Error('Failed to fetch quotes');
      }
    },
    journalEntries: async (_parent: any, _args: any, context: any) => {
      isAuthenticated(context);
      try {
        return await JournalEntry.find();
      } catch (error) {
        logger.error(`Error in getJournalEntries resolver: ${error}`);
        throw new Error('Failed to fetch journal entries');
      }
    },
    journalEntriesByUser: async (_parent: any, { userId }: { userId: string }, context: any) => {
      isAuthenticated(context);
      try {
        const user = await User.findById(userId).populate({
          path: 'journalEntries',
          model: 'JournalEntry',
        });
        if (!user) throw new Error('User not found');
        return user.journalEntries;
      } catch (error) {
        logger.error(`Error in getJournalEntriesByUser resolver: ${error}`);
        throw new Error('Failed to fetch journal entries');
      }
    },
  },

  Mutation: {
    addQuote: async (_parent: any, { text, author, userId }: any, context: any) => {
      isAuthenticated(context);
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const newQuote = new Quote({ text, author, user: userId });
        const savedQuote = await newQuote.save();

        user.savedQuotes.push(savedQuote._id);
        await user.save();

        return savedQuote;
      } catch (error) {
        logger.error(`Error in addQuote resolver: ${error}`);
        throw new Error('Failed to add quote');
      }
    },
    saveQuote: async (_parent: any, { userId, quoteId }: any, context: any) => {
      isAuthenticated(context);
      try {
        const user = await User.findById(userId);
        const quote = await Quote.findById(quoteId);

        if (!user || !quote) throw new Error("User or Quote not found");

        if (!user.savedQuotes.includes(new mongoose.Types.ObjectId(quoteId))) {
          user.savedQuotes.push(new mongoose.Types.ObjectId(quoteId));
          await user.save();
        }

        return user;
      } catch (error) {
        logger.error(`Error in saveQuote resolver: ${error}`);
        throw new Error('Failed to save quote');
      }
    },
    addJournalEntry: async (_parent: any, { userId, title, content }: any, context: any) => {
      isAuthenticated(context);
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const newJournalEntry = new JournalEntry({
          title,
          content,
          date: new Date(),
          user: userId,
        });

        const savedEntry = await newJournalEntry.save();

        user.journalEntries.push(savedEntry._id);
        await user.save();

        return savedEntry;
      } catch (error) {
        logger.error(`Error in addJournalEntry resolver: ${error}`);
        throw new Error('Failed to add journal entry');
      }
    },
    registerUser: async (_parent: any, { username, email, password, firstName, lastName }: any) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          firstName,
          lastName,
        });

        await newUser.save();
       const token = generateToken({ id: newUser.id, username: newUser.username });

        return {
          token,
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,

        };
      } catch (error) {
        logger.error(`Error in registerUser resolver: ${error}`);
        throw new Error('Failed to register user');
      }
    },
    loginUser: async (_parent: any, { username, password }: any) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        const token = generateToken({ id: user.id, username: user.username });

        return {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        };
      } catch (error) {
        logger.error(`Error in loginUser resolver: ${error}`);
        throw new Error('Failed to log in');
      }
    },
  },
};

export default resolvers;
