import { gql } from 'apollo-server';

const typeDefs = gql`
    scalar Date
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        savedQuotes: [Quote!]!
        journalEntries: [JournalEntry!]!
    }

    type AuthPayload {
    token: String!
    user: User!
    }

    type Quote {
        id: ID!
        text: String!
        author: String!
        savedBy: [User!]!
    }

    type JournalEntry {
        id: ID!
        title: String!
        content: String!
        date: Date!
        user: User!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        quotes: [Quote!]!
        quotesByUser(userId: ID!): [Quote!]!
        journalEntries: [JournalEntry!]!
        journalEntriesByUser(userId: ID!): [JournalEntry!]!
    }

    type Mutation {
    addQuote(text: String!, author: String, userId: ID!): Quote
    saveQuote(userId: ID!, quoteId: ID!): User
    addJournalEntry(userId: ID!, title: String!, content: String!): JournalEntry
    registerUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): User!
    loginUser(username: String!, password: String!): AuthPayload!
}

`;

export default typeDefs;