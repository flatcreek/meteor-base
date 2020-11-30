import { gql } from '@apollo/client';

export default gql`
  type Comment {
    _id: String
    user: User
    documentId: String
    comment: String
    createdAt: String
  }
`;
