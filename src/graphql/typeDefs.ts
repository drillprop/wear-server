import { gql } from 'apollo-server';

export default gql`
  type Query {
    users: [User]
  }
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
  }
`;
