const Listing = require("../models/listing.js");

module.exports.allListing = async (req, res) => {
  const allListings = await Listing.find({});
  return res.render("listings/index.ejs", { allListings });
};

module.exports.newListingForm = (req, res) => {
  return res.render("listings/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created Successfully");
  return res.redirect("/listings");
};

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  console.log(listing);

  if (!listing) {
    req.flash("error", "Listing not Found");
    return res.redirect("/listings");
  }

  return res.render("listings/show.ejs", { listing });
};

module.exports.editForm = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not Found");
    return res.redirect("/listings");
  }
  return res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res, next) => {
  const { id } = req.params;

  const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
  });
  req.flash("success", "Listing Successfully Edited");
  return res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res, next) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    req.flash("error", "Listing not Found");
  } else {
    console.log(deletedListing);
    req.flash("success", "Listing Deleted Successfully");
  }
  return res.redirect("/listings");
};
