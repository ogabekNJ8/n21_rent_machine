const router = require("express").Router();

const categoryRouter = require("./category.routes");
const regionRouter = require("./region.routes");
const districtRouter = require("./district.routes");
const statusRouter = require("./status.routes");
const commissionRouter = require("./commission.routes");
const userRouter = require("./user.routes");
const userAddressRouter = require("./user_address.routes");
const machineRouter = require("./machine.routes");
const imageRouter = require("./image.routes");

router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/status", statusRouter);
router.use("/commission", commissionRouter);
router.use("/user", userRouter);
router.use("/user_address", userAddressRouter);
router.use("/machine", machineRouter);
router.use("/image", imageRouter);

module.exports = router;
