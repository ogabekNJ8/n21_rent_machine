const router = require("express").Router();
const {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

router.post("/", addReview);
router.get("/", getAllReviews);
router.get("/:id", getReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
