const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let tokenSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  image: {
    type: String
  },
}, {
    collection: 'tokens'
  })

module.exports = mongoose.model('Token', tokenSchema)