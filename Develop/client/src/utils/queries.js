import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
query Me {
  me {
    _id
    bookCount
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
    email
    username
  }
}
`;