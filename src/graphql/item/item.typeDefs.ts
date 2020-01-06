import { gql } from 'apollo-server-express';

export default gql`
  input ItemInput {
    name: String!
    price: Int!
    imageUrl: String!
    category: String!
  }

  extend type Mutation {
    createItem(input: ItemInput!): Item!
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
