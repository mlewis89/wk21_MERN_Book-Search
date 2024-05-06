import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username 
        email
        bookCount 
        savedBooks
      }
    }
`;