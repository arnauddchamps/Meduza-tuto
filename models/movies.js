const mongoose = require("mongoose");

const { Schema } = mongoose;

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
});

//virtual fields
MovieSchema.set("toJSON", {
  getters: true,
  virtuals: true
});

MovieSchema.set("toObject", {
  getters: true,
  virtuals: true
});

MovieSchema.virtual("test").get(function() {
  return "Hello";
});

//creating a model
const Movie = mongoose.model("Movies", MovieSchema);

//export Movies model
module.exports = { Movie };
