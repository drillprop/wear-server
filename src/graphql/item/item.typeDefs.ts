import { gql } from 'apollo-server-express';

export default gql`
  input CreateItemInput {
    name: String!
    price: Int!
    imageUrl: String!
    category: String!
  }

  input ItemWhereInput {
    column: String
    argument: String
    take: Int
    skip: Int
    orderBy: String
    desc: Boolean
    priceFrom: Int
    priceTo: Int
  }

  extend type Mutation {
    createItem(input: CreateItemInput!): Item!
  }

  extend type Query {
    items(input: ItemWhereInput): [Item]!
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
