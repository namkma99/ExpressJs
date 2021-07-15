const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Accesss Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};
