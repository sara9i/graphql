const { ObjectId } = require('mongodb');

const Game = require('./models/Game');
const Author = require('./models/Author');
const Review = require('./models/Review');

const fixtureData = {
  games: [
    {_id: new ObjectId("679fb57182b3d5fb241c2b88"), title: 'Zelda, Tears of the Kingdom', platform: ['Switch']},
    {_id: new ObjectId("679fb57182b3d5fb241c2b89"), title: 'Final Fantasy 7 Remake', platform: ['PS5', 'Xbox']},
    {_id: new ObjectId("679fb57182b3d5fb241c2b8a"), title: 'Elden Ring', platform: ['PS5', 'Xbox', 'PC']},
    {_id: new ObjectId("679fb57182b3d5fb241c2b8b"), title: 'Mario Kart', platform: ['Switch']},
    {_id: new ObjectId("679fb57182b3d5fb241c2b8c"), title: 'Pokemon Scarlet', platform: ['PS5', 'Xbox', 'PC']},
  ],
  authors: [
    {_id: new ObjectId("679fb62282b3d5fb241c2b8d"), name: 'mario', verified: true},
    {_id: new ObjectId("679fb62282b3d5fb241c2b8e"), name: 'yoshi', verified: false},
    {_id: new ObjectId("679fb62282b3d5fb241c2b8f"), name: 'peach', verified: true},
  ],
  reviews: [
    { "_id" : new ObjectId("679fb6a882b3d5fb241c2b90"),
      "rating" : 9,
      "content" : "lorem ipsum",
      "author_id" : new ObjectId("679fb62282b3d5fb241c2b8d"),
      "game_id" : new ObjectId("679fb57182b3d5fb241c2b89")
  },
  {
      "_id" : new ObjectId("679fb6a882b3d5fb241c2b91"),
      "rating" : 10,
      "content" : "lorem ipsum",
      "author_id" : new ObjectId("679fb62282b3d5fb241c2b8e"),
      "game_id" : new ObjectId("679fb57182b3d5fb241c2b88")
  },
  {
      "_id" : new ObjectId("679fb6a882b3d5fb241c2b92"),
      "rating" : 7,
      "content" : "lorem ipsum",
      "author_id" : new ObjectId("679fb62282b3d5fb241c2b8f"),
      "game_id" : new ObjectId("679fb57182b3d5fb241c2b8a")
  },
  {
      "_id" : new ObjectId("679fb6a882b3d5fb241c2b93"),
      "rating" : 5,
      "content" : "lorem ipsum",
      "author_id" : new ObjectId("679fb62282b3d5fb241c2b8e"),
      "game_id" : new ObjectId("679fb57182b3d5fb241c2b8b")
  },
  {
      "_id" : new ObjectId("679fb6a882b3d5fb241c2b94"),
      "rating" : 8,
      "content" : "lorem ipsum",
      "author_id" : new ObjectId("679fb62282b3d5fb241c2b8e"),
      "game_id" : new ObjectId("679fb57182b3d5fb241c2b8c")
  },
  {
      "_id" : new ObjectId("679fb6a882b3d5fb241c2b95"),
      "rating" : 7,
      "content" : "lorem ipsum",
      "author_id" : new ObjectId("679fb62282b3d5fb241c2b8d"),
      "game_id" : new ObjectId("679fb57182b3d5fb241c2b89")
  },
  {
      "_id" : new ObjectId("679fb6a882b3d5fb241c2b96"),
      "rating" : 10,
      "content" : "lorem ipsum",
      "author_id" : new ObjectId("679fb62282b3d5fb241c2b8f"),
      "game_id" : new ObjectId("679fb57182b3d5fb241c2b88")
  }
  
  ]
};

const loadFixtures = async () => {
  console.log('⚡ Running fixture data setup...');

  try {
    // Clear existing data
    await Game.deleteMany({});
    await Author.deleteMany({});
    await Review.deleteMany({});

    // Insert Authors
    const authors = await Author.insertMany(fixtureData.authors);
    
    // Insert Games
    const games = await Game.insertMany(fixtureData.games);

    // Insert Reviews 
    const reviews = await Review.insertMany(fixtureData.reviews);

    console.log('Fixture data loaded successfully.');
  } catch (error) {
    console.error('Error loading fixture data:', error);
  }
};

module.exports = loadFixtures;