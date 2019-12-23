import { gql } from 'apollo-server';

export default gql`
  type Query {
    users: [User]
  }
  type Mutation {
    createUser(email: String!, userName: String!, password: String!): User!
  }
  type User {
    id: ID!
    email: String!
    userName: String!
    password: String!
    firstName: String
    lastName: String
  }
`;
