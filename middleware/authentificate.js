const authentificate = (req, res, next) => {
  console.log("Hello i'm a middleware");
  //next();
  res.status(401).redirect("/movies");
};

module.exports = { authentificate };
