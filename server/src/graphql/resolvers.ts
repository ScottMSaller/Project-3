import mongoose from "mongoose";
import JournalEntry from "../models/JournalEntry";
import Quote from "../models/Quote";
import User from "../models/User";
import bcrypt from 'bcrypt';
import { DateScalar } from "../util/DateScalar";
import logger from "../util/logger";
import { signToken } from "../util/auth";

const resolvers = {
  Date: DateScalar,

  Query: {
    users: async (_parent: any, _args: any, context: { user: { _id: any; }; }) => {
      try {
        if(context.user){
          return await User.find(context.user._id);
        }
      } catch (error) {
        logger.error(`Error in getUser resolver: ${error}`);
        throw new Error('Failed to fetch users');
      }
    },
    user: async (_parent: any, { id }: { id: string }, context: { user: { _id: any; }; }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        logger.error(`Error in getUser resolver: ${error}`);
        throw new Error('Failed to fetch user');
      }
    },
    getUserQuotes: async (_, { userId }) => {
      return await Quote.find({ user: userId });
    },
    journalEntries: async (_parent: any, _args: any, context: { user: { _id: any; }; }) => {
      try {
        return await JournalEntry.find();
      } catch (error) {
        logger.error(`Error in getJournalEntries resolver: ${error}`);
        throw new Error('Failed to fetch journal entries');
      }
    },
    journalEntriesByUser: async (_parent: any, { userId }: { userId: string }, context: { user: { _id: any; }; }) => {
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
    createQuote: async (_, { q, a, c, h, userId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const newQuote = new Quote({ q, a, c, h, user: userId });
      const savedQuote = await newQuote.save();

      user.quotes.push(savedQuote._id);
      await user.save();

      return savedQuote;
    },
    addJournalEntry: async (_parent: any, { userId, title, content }: any) => {
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
        console.error(`Error in addJournalEntry resolver: ${error}`);
        throw new Error('Failed to add journal entry');
      }
    },
    registerUser: async (_parent: any, { username, email, password, firstName, lastName }: any) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          username,
          email,
          password: hashedPassword,
          firstName,
          lastName,
        });

        await user.save();
        const token = signToken(user);
        return { token, user };

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
        const token = signToken(user);
        return { token, user };

      } catch (error) {
        logger.error(`Error in loginUser resolver: ${error}`);
        throw new Error('Failed to log in');
      }
    },
  },
  User: {
    quotes: async (parent: { id: any; }) => {
      return await Quote.find({ user: parent.id });
    },
  },
  Quote: {
    user: async (parent: { user: any; }) => {
      return await User.findById(parent.user);
    },
  },
};

export default resolvers;
