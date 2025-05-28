const router = require("express").Router();
const {
  addDistrict,
  getAllDistricts,
  getDistrict,
  updateDistrict,
  deleteDistrict,
} = require("../controllers/district.controller");

router.post("/", addDistrict);
router.get("/", getAllDistricts);
router.get("/:id", getDistrict);
router.patch("/:id", updateDistrict);
router.delete("/:id", deleteDistrict);

module.exports = router;
