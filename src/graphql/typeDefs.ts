import { gql } from 'apollo-server-express';

export default gql`
  input SignInput {
    email: String!
    password: String!
  }
  type SuccessMessage {
    message: String
  }
  type Query {
    users: [User]
    me: User
  }
  type Mutation {
    register(input: SignInput!): User!
    login(input: SignInput!): User!
    signout: SuccessMessage
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
