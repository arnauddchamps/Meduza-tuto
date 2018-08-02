const mongoose = require("mongoose")

const { Schema } = mongoose

//define a Schema
const MovieSchema = new Schema({
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  genre: {
    type: String,
    minlength: 1,
    required: true
  },
  date: {
    type: Date,
    minlength: 1,
    required: true
  },
  synopsis: {
    type: String,
    minlength: 10,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

//creating a model
const Movie = mongoose.model("Movies", MovieSchema)

//export Movies model
module.exports = { Movie }
