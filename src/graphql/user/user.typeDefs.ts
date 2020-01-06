import { gql } from 'apollo-server-express';

export default gql`
  enum UserRole {
    ADMIN
    EMPLOYEE
    CUSTOMER
  }

  input SignInput {
    email: String!
    password: String!
  }

  extend type Query {
    users: [User]
    me: User
  }

  extend type Mutation {
    register(input: SignInput!): User!
    login(input: SignInput!): User!
    signout: SuccessMessage
    changeUserRole(email: String!, role: UserRole!): SuccessMessage
    deleteAccount(password: String!): SuccessMessage
  }

  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    role: UserRole!
    createdAt: Date!
  }
`;