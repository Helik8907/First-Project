const express = require("express");
const { validateUser, saveRedirectUrl } = require("../utils/midleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const router = express.Router();
const user = require("../controller/userController.js");

// signup

router
  .route("/signIn")
  .get( wrapAsync(user.signInForm))
  .post( validateUser, wrapAsync(user.createNewUser));

// LogIn

router
  .route("/logIn")
  .get(wrapAsync(user.logInForm))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/logIn",
      failureFlash: true,
    }),
    wrapAsync(user.logIn),
  );

// LogOut

router.get("/logOut", wrapAsync(user.logOut));

module.exports = router;
