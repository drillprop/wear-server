import { gql } from 'apollo-server-express';

export default gql`
  enum Permissions {
    ADMIN
    EMPLOYEE
    CUSTOMER
  }
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
    id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    permissions: Permissions!
  }
`;
