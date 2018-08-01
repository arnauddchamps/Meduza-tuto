const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes/routes.js")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

const server = app.listen(3000, () => {
  console.log("Bienvenue dans mon magasin", server.address().port)
})
