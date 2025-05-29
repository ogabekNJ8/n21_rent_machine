const router = require("express").Router();
const {
  addMachine,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
} = require("../controllers/machine.controller");

router.post("/", addMachine);
router.get("/", getAllMachines);
router.get("/:id", getMachine);
router.patch("/:id", updateMachine);
router.delete("/:id", deleteMachine);

module.exports = router;
