import { gql } from '@apollo/client';

export const CREATE_QUOTE = gql`
  mutation CreateQuote($q: String!, $a: String!, $c: String, $h: String, $userId: ID!) {
    createQuote(q: $q, a: $a, c: $c, h: $h, userId: $userId) {
      id
      q
      a
    }
  }
`;


export const ADD_JOURNAL_ENTRY = gql`
  mutation AddJournalEntry($userId: ID!, $title: String!, $content: String!) {
    addJournalEntry(userId: $userId, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
       token
       user {
        id
        username
       }
    }
  }
`;

export const REGISTER_USER = gql`
mutation RegisterUser($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  registerUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
    token
    user {
      id
      username
    }
  }
}
`;



  


