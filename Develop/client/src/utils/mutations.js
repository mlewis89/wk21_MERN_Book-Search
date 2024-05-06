import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        bookCount
        email
        savedBooks {
          link
          title
          image
          description
          bookId
          authors
        }
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation Mutation {
    saveBook {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      bookCount
      email
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
`;
