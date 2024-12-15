import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;

export const GET_QUOTES = gql`
  query GetQuotes {
    quotes {
      id
      text
      author
    }
  }
`;

export const GET_USER_QUOTES = gql`
  query GetUserQuotes($userId: ID!) {
    getUserQuotes(userId: $userId) {
      id
      q
      a
    }
  }
`;


export const GET_JOURNAL_ENTRIES = gql`
  query GetJournalEntries {
    journalEntries {
      id
      title
      content
      date
    }
  }
`;

export const GET_JOURNAL_ENTRIES_BY_USER = gql`
  query GetJournalEntriesByUser($userId: ID!) {
    journalEntriesByUser(userId: $userId) {
      id
      title
      content
      date
    }
  }
`;
