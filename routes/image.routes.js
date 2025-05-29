const router = require("express").Router();
const { addImage } = require("../controllers/image.controller");

router.post("/", addImage);

module.exports = router;
