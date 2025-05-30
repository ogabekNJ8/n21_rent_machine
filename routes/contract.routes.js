const router = require("express").Router();
const {
  addContract,
  getAllContracts,
  getContract,
  updateContract,
  deleteContract,
} = require("../controllers/contract.controller");

router.post("/", addContract);
router.get("/", getAllContracts);
router.get("/:id", getContract);
router.patch("/:id", updateContract);
router.delete("/:id", deleteContract);

module.exports = router;
