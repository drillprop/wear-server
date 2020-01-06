import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

  type Mutation

  type Query

  type SuccessMessage {
    message: String
  }
`;
