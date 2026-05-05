const express = require("express");
// const {reviewSchema}=require("../utils/schema.js")
const { validateReview, isLoggedIn ,reviewAuth} = require("../utils/midleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router({ mergeParams: true });
const review= require("../controller/reviewController.js");

// create

router.post(
  "/",
  validateReview,
  isLoggedIn("Please LogIn before creating a new Review"),
  wrapAsync(review.createReview),
);

router
.route("/:reviewId")
//update route
.put(
  isLoggedIn("Please LogIn before editing a Review"),
  reviewAuth("Edit this Review"),
  validateReview,
  wrapAsync(review.updateReview),
)
//delete route
.delete(
  isLoggedIn("Please LogIn before deleting a Review"),
  reviewAuth("Delete this Review"),
  wrapAsync(review.destroyReview),
);

//Edit Route
router.get(
  "/:reviewId/edit",
  isLoggedIn("Please LogIn before editing a Review"),
  reviewAuth("Edit this Review"),
  wrapAsync(review.editForm),
);

module.exports = router;