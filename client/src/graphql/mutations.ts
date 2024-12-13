import { gql } from '@apollo/client';

export const ADD_QUOTE = gql`
  mutation AddQuote($text: String!, $author: String!, $userId: ID!) {
    addQuote(text: $text, author: $author, userId: $userId) {
      id
      text
      author
    }
  }
`;

export const SAVE_QUOTE = gql`
  mutation SaveQuote($userId: ID!, $quoteId: ID!) {
    saveQuote(userId: $userId, quoteId: $quoteId) {
      id
      username
      savedQuotes {
        id
        text
        author
      }
    }
  }
`;

export const ADD_JOURNAL_ENTRY = gql`
  mutation AddJournalEntry($userId: ID!, $title: String!, $content: String!, $date: String!) {
    addJournalEntry(userId: $userId, title: $title, content: $content, date: $date) {
      id
      title
      content
      date
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
        token
    }
  }
`;

export const REGISTER_USER = gql`
mutation RegisterUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;



  


