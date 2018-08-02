const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes/server.js")
const app = express()
const _ = require("lodash")

// set the view engine to ejs
app.set("view engine", "ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//import JSON File
const movies = require("./data/dvd.json")

//connect to db/mongoose
const { mongoose } = require("./db/mongoose")

/**
 * List all movies
 * Function is only for user
 * @method GET
 * @param
 * @return JSON movies
 */

app.get("/movies", (req, res) => {
  //Render /views/home.ejs
  res.render("home", {
    movies: movies
  })
})

/**
 * List only one movie by id
 * Function is only for user
 * @method GET
 * @param Int id
 * @return JSON movie
 */
app.get("/movie/:id", (req, res) => {
  // find the movie in the `movies` array
  let movie = movies.filter(movie => {
    const { params } = req
    const { id } = params
    return movie.id == id
  })[0]
  // render the `movie.ejs` template with the movie content
  movie = _.pick(movie, ["author", "title", "body"])
  // render /views/movie.ejs
  res.render("movie", { movie })
})

/**
 * Add a new movie
 * Function is only for user
 * @method POST
 * @param Text name (req.body)
 * @return all movies + new movie
 */
app.post("/movies", (req, res) => {})

/**
 * Update the name of a movie
 * Function is only for user
 * @method PATCH
 * @param Int id, Text name (req.body)
 * @return all movies + new movie's name
 */
app.patch("/movie/:id", (req, res) => {})

/**
 * Delete the name of a movie
 * Function is only for user
 * @method DELETE
 * @param Int id
 * @return all movies without deleted movie
 */
app.delete("/movie/:id", (req, res) => {})

routes(app)

const server = app.listen(3000, () => {
  console.log("Bienvenue dans mon magasin", server.address().port)
})
