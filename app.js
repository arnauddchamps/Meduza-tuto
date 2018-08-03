const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/server.js");
const app = express();
const _ = require("lodash");
const { Movie } = require("./models/movies");
const { authentificate } = require("./middleware/authentificate");
// set the view engine to ejs
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to db/mongoose
const { mongoose } = require("./db/mongoose");

/**
 * List all movies
 * Function is only for user
 * @method GET
 * @param
 * @return db movies with mongoose
 */
app.get("/movies", authentificate, (req, res) => {
  const { Movie } = require("./models/movies");
  Movie.find({})
    .then(movies => res.render("home", { movies }))
    .catch(e => {
      console.log("error", e);
    });
});

app.get("/movies/categories", authentificate, (req, res) => {
  Movie.findByGender("Horror")
    .then(movies => {
      res.render("home", { movies });
    })
    .catch(e => {
      console.log(e);
    });
});

/**
 * List only one movie by id
 * Function is only for user
 * @method GET
 * @param Int id
 * @return movie with right id
 */
app.get("/movies/:id", authentificate, (req, res) => {
  const { Movie } = require("./models/movies");
  Movie.findOne({ _id: req.params.id })
    .then(movie => res.render("movie", { movie }))
    .catch(e => {
      console.log("error", e);
    });
});

/**
 * Add a new movie
 * Function is only for user
 * @method POST
 * @param Text name (req.body)
 * @return all movies + new movie
 */
app.post("/movies", authentificate, (req, res) => {
  const { Movie } = require("./models/movies");
  console.log(req.body);
  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    date: req.body.date,
    synopsis: req.body.synopsis
  });
  movie.alphabet_v = movie.title;
  movie
    .save()
    .then(movie => {
      console.log(movie, "New movie saved");
    })
    .then(res.redirect("/movies"))
    .catch(e => {
      console.log("error", e);
    });
});

/**
 * Update a new movie
 * Function is only for user
 * @method POST
 * @param Text title (req.body)
 * @return the movie modified
 */
app.post("/movies/:id/update", authentificate, (req, res) => {
  console.log(req.body);
  const data = { title: req.body.title };
  Movie.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })

    .then(movie => res.redirect("/movies/" + movie._id))
    .catch(e => {
      console.log("Error", e);
    });
});

/**
 * Delete the name of a movie
 * Function is only for user
 * @method DELETE
 * @param Int id
 * @return all movies without deleted movie
 */
app.get("/movies/:id/delete", authentificate, (req, res) => {
  const { Movie } = require("./models/movies");

  Movie.findOneAndDelete({ _id: req.params.id })
    .then(movie => {
      console.log("movie supprimée");
    })
    .then(res.redirect("/movies"))
    .catch(e => {
      console.log("Error", e);
    });
});

routes(app);

const server = app.listen(3000, () => {
  console.log("Bienvenue dans mon magasin", server.address().port);
});

// //import JSON File
// const movies = require("./data/dvd.json")

// Retrive a movie

// /**
//  * List all movies
//  * Function is only for user
//  * @method GET
//  * @param
//  * @return JSON movies
//  */

// app.get("/movies", (req, res) => {
//   //Render /views/home.ejs
//   res.render("home", {
//     movies: movies
//   })
// })

// /**
//  * List only one movie by id
//  * Function is only for user
//  * @method GET
//  * @param Int id
//  * @return JSON movie
//  */
// app.get("/movie/:id", (req, res) => {
//   // find the movie in the `movies` array
//   let movie = movies.filter(movie => {
//     const { params } = req
//     const { id } = params
//     return movie.id == id
//   })[0]
//   // render the `movie.ejs` template with the movie content
//   movie = _.pick(movie, ["author", "title", "body"])
//   // render /views/movie.ejs
//   res.render("movie", { movie })
// })
// Update a movie
//   const id = "5b62f6bef33da50fa1d40e03"
//   const data = { title: "TEST nom de film !" }

//   Movie.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })
//     .then(movie => {
//       console.log(movie)
//     })
//     .catch(e => {
//       console.log("Error", e)
//     })

//add a new movie with movie model
app.get("/test", (req, res) => {
  const { Movie } = require("./models/movies");
  //   const movie = new Movie({
  //     title: "A supprimer",
  //     genre: "Horror",
  //     date: "2018-08-02",
  //     synopsis: "France-Belgique"
  //   })
  //   movie
  //     .save()
  //     .then(movie => {
  //       console.log("New movie saved")
  //     })
  //     .catch(e => {
  //       console.log("error", e)
  //     })
  // })

  //   //retrieve all movies
  //   Movie.find({})
  //     .then(result => {
  //       console.log(result)
  //     })
  //     .catch(e => {
  //       console.log("Error", e)
  //     })
  // })

  //   // Retrive a movie
  //   Movie.findOne({ genre: "Horror" })
  //     .then(movie => {
  //       console.log(movie)
  //     })
  //     .catch(e => {
  //       console.log("Error", e)
  //     })

  //   // Update a movie
  //   const id = "5b62f6bef33da50fa1d40e03"
  //   const data = { title: "TEST nom de film !" }

  //   Movie.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })
  //     .then(movie => {
  //       console.log(movie)
  //     })
  //     .catch(e => {
  //       console.log("Error", e)
  //     })
  // })

  //   // //Find and  Delete a movie
  //   const id = "5b62fbfa498c7a1803c80420"
  //   Movie.findOneAndDelete({ _id: id })
  //     .then(movie => {
  //       console.log(movie)
  //     })
  //     .catch(e => {
  //       console.log("Error", e)
  //     })
  // })

  //   //Delete a movie
  //   const id = "5b62faed1fd6e8160f785b4b"
  //   Movie.deleteOne({ _id: id })
  //     .then(movie => {
  //       console.log("movie supprimée")
  //     })
  //     .catch(e => {
  //       console.log("Error", e)
  //     })
});
