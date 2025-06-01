const router = require("express").Router();
const {
  addUserAddress,
  getUserAddresses,
  getUserAddress,
  // updateUserAddress,
  // deleteUserAddress,
} = require("../controllers/user_address.controller");
const authGuard = require("../middleware/guards/auth.guard");
const roleGuard = require("../middleware/guards/role.guard");
const selfGuard = require("../middleware/guards/self.guard");

router.post("/", addUserAddress);
router.get("/", authGuard, roleGuard(["admin"]), getUserAddresses);
router.get("/:id", authGuard, selfGuard, getUserAddress);
// router.patch("/:id", updateUserAddress);
// router.delete("/:id", deleteUserAddress);

module.exports = router;
