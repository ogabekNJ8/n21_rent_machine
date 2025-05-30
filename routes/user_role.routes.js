const router = require("express").Router();
const {
  addUserRole,
  getAllUserRoles,
  deleteUserRole,
} = require("../controllers/user_role.controller");

router.post("/", addUserRole);
router.post("/remove", deleteUserRole);

router.get("/", getAllUserRoles);
// router.get("/:id", getRole);
// router.patch("/:id", updateRole);

module.exports = router;
