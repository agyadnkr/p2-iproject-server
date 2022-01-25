const errorHandler = (err, req, res, next) => {

  switch (err.name) {
    case `SequelizeValidationError`:
      res.status(400).json({ message: err.errors[0].message })
      break;
    case `SequelizeUniqueConstraintError`:
      res.status(400).json({ message: err.errors[0].message })
      break;
    case `SequelizeDatabaseError`:
      res.status(400).json({ message: "Bad Request" })
      break;
    case `AuthenticationFailed`:
      res.status(401).json({ message: `Invalid token` })
      break;
    case `TokenExpiredError`:
      res.status(401).json({ message: `Token expired` })
      break;
    case `Forbidden`:
      res.status(403).json({ message: `Unauthorized` })
      break;
    case `NotFound`:
      res.status(404).json({ message: `Product not found` })
      break;
    case `EmailInvalid`:
      res.status(400).json({ message: `Invalid Email` })
      break;
    case `PasswordInvalid`:
      res.status(400).json({ message: `Invalid Password` })
      break;
    case `CreateNewAccountFailed`:
      res.status(500).json({ message: `Failed to Create New Account` })
      break;
    default:
      console.log(err);
      res.status(500).json({ message: `Internal server errror` })
      break;
  }

}

module.exports = errorHandler