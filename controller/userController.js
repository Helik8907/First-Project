const User = require("../models/user.js");

module.exports.signInForm=async (req, res) => {
    return res.render("user/signIn.ejs");
  };

  module.exports.createNewUser=async (req, res) => {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const reg = await User.register(newUser, password);
      console.log(reg);
      req.login(reg, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust");
        return res.redirect("/listings");
      });
    };

    module.exports.logInForm=async (req, res) => {
    return res.render("user/logIn.ejs");
  };

  module.exports.logIn=async (req, res) => {
    req.flash("success", "Welcome Back to WanderLust");
    res.redirect(res.locals.redirectUrl);
  };

  module.exports.logOut=async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You LoggedOut successfully");
      return res.redirect("/listings");
    });
  };