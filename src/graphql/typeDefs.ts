import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

  enum UserRole {
    ADMIN
    EMPLOYEE
    CUSTOMER
  }

  type SuccessMessage {
    message: String
  }

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

  type Item {
    id: ID!
    name: String!
    price: Int!
    imageUrl: String!
    category: String
    createdAt: Date!
    updatedAt: Date
  }
`;
