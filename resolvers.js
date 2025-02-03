const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Game = require('./models/Game');
const Author = require('./models/Author');
const Review = require('./models/Review');

const resolvers = {
  Query: {
    games: async () => await Game.find(),
    game: async (_, { id }) =>{
      const result =  await Game.findById(new ObjectId(id));
      console.log("result");
      console.log(result);
      return result
    },  

    authors: async () => await Author.find(),
    author: async (_, { id }) => await Author.findById(new ObjectId(id)), 

    reviews: async () => {
      const result = await Review.find().populate('game_id author_id');
      console.log(result);
      return result;
    },
    review: async (_, { id }) =>{
      const result = await Review.findById(new ObjectId(id)).populate('game_id author_id')
      console.log("review result");
      console.log(result);
      return result
    }, 
  },

  Mutation: {
    addGame: async (_, { game }) => {
      const newGame = new Game(game);
      return await newGame.save();
    },

    addAuthor: async (_, { author }) => {
      const newAuthor = new Author(author);
      return await newAuthor.save();
    },

    addReview: async (_, { review }) => {
      const newReview = new Review(review);
      return (await newReview.save()).populate('author_id');
    },
    deleteGame: async (_, { id }) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Convert id to ObjectId
        const gameId = new ObjectId(id);
        
        // Delete the Game
        const gameDeletion = await Game.findByIdAndDelete(gameId, { session });
        if (!gameDeletion) {
          throw new Error("Game not found");
        }
        
        // Delete all associated Reviews
        await Review.deleteMany({ game_id: gameId }, { session });
        
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        
        return { success: true, message: "Game and associated reviews deleted successfully" };
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error("Failed to delete game: " + error.message);
      }
    },
    
    deleteAuthor: async (_, { id }) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Convert id to ObjectId
        const authorId = new ObjectId(id);
        
        // Delete the Author
        const authorDeletion = await Author.findByIdAndDelete(authorId, { session });
        if (!authorDeletion) {
          throw new Error("Author not found");
        }
        
        // Delete all associated Reviews
        await Review.deleteMany({ author_id: authorId }, { session });
        
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        
        return { success: true, message: "Author and associated reviews deleted successfully" };
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error("Failed to delete author: " + error.message);
      }
    },
    deleteReview: async (_, { id}) => {
      await Review.deleteOne({_id: new ObjectId(id)});
      return { success: true, message: "Review deleted Successfully" };
    },

  },
  Game: {
    reviews: async (parent) => {
      return await Review.find({ game_id: parent._id }).populate('author_id');
    },
  },

  Review: {
    author: async (parent) => {
      return await Author.findById(parent.author_id);
    },
    game: async (parent) => {
      return await Game.findById(parent.game_id);
    },
  },

  Author: {
    reviews: async (parent) => {
      return await Review.find({ author_id: parent._id });
    },
  },
};

module.exports = resolvers;