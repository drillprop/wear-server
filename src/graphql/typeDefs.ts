import { gql } from 'apollo-server';

export default gql`
  type Query {
    users: [User]
  }
  type User {
    id: ID!
    email: String!
    token: String!
    userName: String!
  }
`;
