const appRouter = app => {
  app.get("/", function(req, res) {
    res.status(200).send("Nodejs api")
  })

  app.get("/accueil", function(req, res) {
    res.status(200).send("Bienvenue dans mon magasin")
  })
}

module.exports = appRouter
