const router = require("express").Router();
const {
  addCommission,
  getAllCommissions,
  getCommission,
  updateCommission,
  deleteCommission,
} = require("../controllers/commission.controller");

router.post("/", addCommission);
router.get("/", getAllCommissions);
router.get("/:id", getCommission);
router.patch("/:id", updateCommission);
router.delete("/:id", deleteCommission);

module.exports = router;
