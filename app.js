if (process.env.NODE_ENV!="production") {
require('dotenv').config();
}
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js")
const session=require("express-session");
const MongoStore = require('connect-mongo').default;
const flash=require("connect-flash");
const user=require("./models/user.js")

const dbURL=process.env.ATLAS_URL;

const listingRouter = require("./router/listingRouter.js");
const reviewRouter = require("./router/reviewRouter.js");
const userRouter = require("./router/userRouter.js");

const passport=require("passport");
const localStrategy=require("passport-local");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbURL),{family: 4};
}

app.set("view engine", "ejs");
// app.use(expressLayouts);
app.engine("ejs", ejsMate);
// app.set("layout", "layouts/boilerplate.ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

const store= MongoStore.create({
  mongoUrl:dbURL,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter:24*3600,
});

store.on("error",(err)=>{
  console.log("Error in Mongo Session",err)
});

const sessionOpt={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true
};

app.use(session(sessionOpt));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.crrUser=req.user;
  next();
});

// Default Route
app.use((req, res, next) => {
    console.log("--- NEW REQUEST ---");
    console.log("Path:", req.path);
    console.log("Params:", req.params);
    next();
});
app.get('/', (req, res) => {
      res.redirect('/listings');
    });

// Listings

app.use("/listings",listingRouter);

// Reviews
app.use("/listings/:id/review",reviewRouter);

// Users
app.use("/",userRouter);


// error Middleware
app.get("/favicon.ico", (req, res) => res.status(204));
// Catch-all for unmatched GET requests only
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const { statusCode = 500, message = "Something went wrong" } = err;
  // console.error(err);
  // console.log(err);
  res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen(port, () => {
  console.log("server is listening to port", port);
});
