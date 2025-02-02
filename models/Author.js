const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  verified: { type: Boolean, required: true },
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;