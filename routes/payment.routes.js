const router = require("express").Router();
const {
  addPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");

router.post("/", addPayment);
router.get("/", getAllPayments);
router.get("/:id", getPayment);
router.patch("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
