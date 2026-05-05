const express = require("express");
const {
  validateListing,
  isLoggedIn,
  ownerAuth,
} = require("../utils/midleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const listing = require("../controller/listingController.js");
const multer = require("multer");
const upload = multer({dest:"uploads/"});

//Index Route
router
  .route("/")
  .get(wrapAsync(listing.allListing))//all Listing
  .post(
    isLoggedIn("Please LogIn before creating a new Listing"),
    validateListing,
    wrapAsync(listing.createNewListing),//create new listing
  );

//New listing form Route
router.get(
  "/new",
  isLoggedIn("Please LogIn before creating a new Listing"),
  wrapAsync(listing.newListingForm),
);

router
  .route("/:id")
  .get(wrapAsync(listing.showListing))//show listing
  .put(
    isLoggedIn("Please LogIn before editing a Listing"),
    ownerAuth("Edit this Listing"),
    validateListing,
    wrapAsync(listing.updateListing),
  )//update listing
  .delete(
    isLoggedIn("Please LogIn before deleting a Listing"),
    ownerAuth("Delete this Listing"),
    wrapAsync(listing.destroyListing),
  );//destroy listing

//Edit lisiting form Route
router.get(
  "/:id/edit",
  isLoggedIn("Please LogIn before editing a Listing"),
  ownerAuth("Edit this Listing"),
  wrapAsync(listing.editForm),
);

module.exports = router;
