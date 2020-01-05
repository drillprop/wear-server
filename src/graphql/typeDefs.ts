import { gql } from 'apollo-server-express';

export default gql`
  input SignInput {
    email: String!
    password: String!
  }
  type Query {
    users: [User]
    me: User
  }
  type Mutation {
    register(input: SignInput!): User!
    login(input: SignInput!): User!
  }
  type User {
    token: String!
    id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
  }
`;
