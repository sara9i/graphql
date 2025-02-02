require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const loadFixtures = require('./fixtures'); // Import the fixture loader

// Load environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/graphql_db';
const FIXTURE = process.env.FIXTURE === 'true'; // Convert to boolean

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB Connected');
    // Load fixture data if FIXTURE=true
    if (FIXTURE) {
      await loadFixtures();
    }
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Initialize Express and Apollo Server
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();