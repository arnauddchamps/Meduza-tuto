const movies = require("../data/dvd.json")

const appRouter = app => {
  app.get("/", (req, res) => {
    res.status(200).send("Nodejs api")
  })

  app.get("/listdvd", (req, res) => {
    res.json(movies)
  })

  app.delete("/listdvd", (req, res) => {
    console.log("la route delete marche")
  })
}

module.exports = appRouter
