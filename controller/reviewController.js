const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview=async (req, res) => {
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    let listId = req.params.id;
    let listing = await Listing.findById(listId);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created Successfully");
    return res.redirect("/listings/" + listId);
  };

  module.exports.editForm=async (req, res, next) => {
      const { reviewId,id } = req.params;
      const review = await Review.findById(reviewId);
      console.log(reviewId);
      console.log(id);
      if (!review) {
        req.flash("error", "Listing not Found");
        return res.redirect("/listings/" + id);
      }
      return res.render("review/edit.ejs", { review, id });
    };

    module.exports.updateReview=async (req, res, next) => {
        const { id, reviewId } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(
          reviewId,
          req.body.review,
          { new: true },
        );
        
        req.flash("success", "Review Edited Successfully");
        return res.redirect(`/listings/${id}`);
      };

      module.exports.destroyReview=async (req, res, next) => {
    let { id, reviewId } = req.params;
    let deletedReview = await Review.findByIdAndDelete(reviewId);
    console.log(deletedReview);
    if (!deletedReview) {
      req.flash("error", "Listing not Found");
    } else {
      req.flash("success", "Review Deleted Successfully");
    }
    return res.redirect("/listings/" + id);
  };