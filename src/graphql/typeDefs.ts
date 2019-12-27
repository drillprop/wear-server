import { gql } from 'apollo-server';

export default gql`
  input RegisterInput {
    email: String!
    userName: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): User!
  }
  type User {
    token: String!
    id: ID!
    email: String!
    userName: String!
    password: String!
    firstName: String
    lastName: String
  }
`;
