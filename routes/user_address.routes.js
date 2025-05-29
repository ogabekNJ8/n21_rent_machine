const router = require("express").Router();
const {
  addUserAddress,
  getUserAddresses,
  // getUserAddress,
  // updateUserAddress,
  // deleteUserAddress,
} = require("../controllers/user_address.controller");

router.post("/", addUserAddress);
router.get("/", getUserAddresses);
// router.get("/:id", getUserAddress);
// router.patch("/:id", updateUserAddress);
// router.delete("/:id", deleteUserAddress);

module.exports = router;
