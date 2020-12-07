const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = {
  authMiddleware: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
      console.log(decoded)
      req.userId = decoded.id;
      req.roles = decoded.roles;

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Token invalid" });
    }
  },
  userIdMiddleware : async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next()
    }

    const [, token] = authHeader.split(" ");


    try {
      const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
      console.log(decoded)
      req.userId = decoded.id;

      return next();
    } catch (err) {
      return
    }
  },
}