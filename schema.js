const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Game {
    id: ID!
    title: String!
    platform: [String]!
    reviews: [Review]
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review]
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author
    game: Game
  }

  type Response {
    success: Boolean
    message: String
  }

  input AddGameInput {
    title: String!, 
    platform: [String]!
  }

  input AddAuthorInput {
    name: String!, 
    verified: Boolean!
  }

  input AddReviewInput {
    rating: Int!,
    content: String!,
    authorId: ID!,
    gameId: ID!
  }

  type Query {
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
    reviews: [Review]
    review(id: ID!): Review
  }

  type Mutation {
    addGame(game: AddGameInput!): Game
    addAuthor(author: AddAuthorInput!): Author
    addReview(review: AddReviewInput!): Review
    deleteGame(id: ID!): Response
    deleteAuthor(id: ID!): Response
    deleteReview(id: ID!): Response
  }
`;

module.exports = typeDefs;