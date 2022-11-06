/*
  Auth routes -> /api/auth
*/
const cors = require("cors");
const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser,} = require("../controllers/auth");
const { emailExists } = require("../helpers/databaseValidators");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const router = Router();

var whitelist = ['http://localhost:3000', 'https://jolly-clafoutis-a965bf.netlify.app']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
      console.log('cors')
    } else {
      callback(new Error('Not allowed by CORS'))
      console.log('no cors')
    }
  }
}
router.post(
  "/register",
  
  [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name length must be max 32 characters").isLength({
      max: 32,
    }),
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Password should be between 8-32 characters and should include 1 number, 1 symbol, 1 lowercase and 1 uppercase."
    ).isStrongPassword(),
    check("password", "Password should be between 8-32 characters.").isLength({
      max: 32,
    }),
    validateFields,
    emailExists,
  ],
  createUser
);

router.post(
  "/login",
  cors(corsOptions),
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required.").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.get(validateJWT);


module.exports = router;