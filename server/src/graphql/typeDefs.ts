import { gql } from 'apollo-server';

const typeDefs = gql`
    scalar Date
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        quotes: [Quote!]!
        journalEntries: [JournalEntry!]!
    }

    type Auth {
    token: String!
    user: User
  }

    type Quote {
      id: ID!
      q: String!
      a: String!
      c: String
      h: String
      user: User!
    }

    type JournalEntry {
        id: ID!
        title: String!
        content: String!
        date: Date!
        userId: User!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        quotes: [Quote!]!
        getUserQuotes(userId: ID!): [Quote!]!
        journalEntries: [JournalEntry!]!
        journalEntriesByUser(userId: ID!): [JournalEntry!]!
    }

    type Mutation {
    createQuote(q: String!, a: String!, c: String, h: String, userId: ID!): Quote!
    addJournalEntry(userId: ID!, title: String!, content: String!): JournalEntry!
    registerUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    loginUser(username: String!, password: String!): Auth
}

`;

export default typeDefs;