const router = require("express").Router();
const {
  addMachine,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
  getMachineQuery,
  getMachinePicture,
} = require("../controllers/machine.controller");

router.post("/", addMachine);
router.post("/get_machine", getMachineQuery);
router.get("/", getAllMachines);
router.get("/picture", getMachinePicture);
router.get("/:id", getMachine);
router.patch("/:id", updateMachine);
router.delete("/:id", deleteMachine);

module.exports = router;
