const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect(
  "mongodb://Arnaud51530:Arnaud123/@ds111072.mlab.com:11072/moviesshop"
)

module.exports = { mongoose }
