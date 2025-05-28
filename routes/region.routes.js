const router = require("express").Router();
const {
  addRegion,
  getAllRegions,
  getRegion,
  updateRegion,
  deleteRegion,
} = require("../controllers/region.controller");

router.post("/", addRegion);
router.get("/", getAllRegions);
router.get("/:id", getRegion);
router.patch("/:id", updateRegion);
router.delete("/:id", deleteRegion);

module.exports = router;
