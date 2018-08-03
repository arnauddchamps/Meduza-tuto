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
  },
  alphabet: {
    type: String,
    default: ""
  }
});

//virtual fields (not in db) getters
MovieSchema.set("toJSON", {
  getters: true,
  virtuals: true
});

MovieSchema.set("toObject", {
  getters: true,
  virtuals: true
});

MovieSchema.virtual("test").get(function() {
  return "le film" + this.title + " est sorti le " + this.date;
});

//setters
MovieSchema.virtual("alphabet_v").set(function(title) {
  this.alphabet = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
});

//Methods
MovieSchema.statics.findByGender = function(genre) {
  const Movie = this;
  return new Promise((resolve, reject) => {
    Movie.find({
      genre
    })
      .then(movies => {
        resolve(movies);
      })
      .catch(e => {
        reject(e);
      });
  });
};

MovieSchema.statics.countByGender = function(genre) {
  const Movie = this;
  return new Promise((resolve, reject) => {
    Movie.find({
      genre
    })
      .then(res => resolve(res))
      .catch(e => {
        reject(e);
      });
  });
};

//creating a model
const Movie = mongoose.model("Movies", MovieSchema);

//export Movies model
module.exports = { Movie };
