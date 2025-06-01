const router = require("express").Router();
const {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getMachine,
} = require("../controllers/user.controller");

router.post("/", addUser);
router.post("/get_machine", getMachine);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
