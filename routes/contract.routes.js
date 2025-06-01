const router = require("express").Router();
const {
  addContract,
  getAllContracts,
  getContract,
  updateContract,
  deleteContract,
  getByStatus,
} = require("../controllers/contract.controller");

router.post("/", addContract);
router.post("/status", getByStatus);
router.get("/", getAllContracts);
router.get("/:id", getContract);
router.patch("/:id", updateContract);
router.delete("/:id", deleteContract);

module.exports = router;
