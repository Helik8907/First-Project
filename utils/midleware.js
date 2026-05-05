const {
  reviewSchema,
  listingSchema,
  userSchema,
} = require("../utils/schema.js");

const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    // throw a proper Error object
    return next(
      new ExpressError(400, error.details.map((d) => d.message).join(", ")),
    );
  }
  next();
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    // throw a proper Error object
    return next(
      new ExpressError(400, error.details.map((d) => d.message).join(", ")),
    );
  }
  next();
};

module.exports.isLoggedIn = (message) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", message);
      return res.redirect("/logIn");
    }
    next();
  };
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  } else {
    res.locals.redirectUrl = "/listings";
  }
  next();
};

module.exports.ownerAuth = (message) => {
  return async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (res.locals.crrUser && !listing.owner._id.equals(res.locals.crrUser._id)) {
      req.flash("error", `You have not permission to ${message}`);
      return res.redirect(`/listings/${id}`);
    }
    next();
  };
};

module.exports.reviewAuth = (message) => {
  return async (req, res, next) => {
    let { reviewId,id } = req.params;
    let review = await Review.findById(reviewId);
    if (res.locals.crrUser && !review.author._id.equals(res.locals.crrUser._id)) {
      req.flash("error", `You have not permission to ${message}`);
      return res.redirect(`/listings/${id}`);
    }
    next();
  };
};