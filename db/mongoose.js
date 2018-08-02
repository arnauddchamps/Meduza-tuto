const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect(
  "mongodb://Arnaud51530:arnaud123@ds111072.mlab.com:11072/moviesshop",
  { useNewUrlParser: true }
)

module.exports = { mongoose }
