const joi = require('joi');
const jwt = require('jsonwebtoken');

const signupvalidation = (req, res, next) => {
    const signupschema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(15).required(),
        role:joi.string().valid('admin', 'customer').default('customer'),

    });

    const { error } = signupschema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "validation error", error });
    }
    next();
}

const loginvalidation = (req, res, next) => {
    const loginschema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(15).required(),
    });

    const { error } = loginschema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "validation error", error });
    }
    next();
}

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied! No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "default_secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
    signupvalidation,
    loginvalidation,
    authenticate
};