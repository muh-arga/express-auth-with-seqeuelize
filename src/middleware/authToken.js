const jwt = require("jsonwebtoken");
const env = require("../env");

module.exports = function (req, res, next) {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, env.access_token_secret, (err, user) => {
    if (err)
      return res.status(401).send({ message: "Unauthorized"});
    req.user = user;
    next();
  });
};
