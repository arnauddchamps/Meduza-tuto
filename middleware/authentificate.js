const authentificate = (req, res, next) => {
  console.log("Hello i'm a middleware");
  next();
};

module.exports = { authentificate };
