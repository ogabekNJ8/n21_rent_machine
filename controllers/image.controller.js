const Image = require("../models/image.model");
const { sendErrorresponse } = require("../helpers/send_error_response");
const Machine = require("../models/machine.model");

const addImage = async (req, res) => {
  try {
    const { image_url, machineId } = req.body;

    const machine = await Machine.findByPk(machineId);
    if (!machine) {
      return sendErrorresponse(
        { message: "Berilgan machineId (machine) topilmadi" },
        res,
        400
      );
    }
    const newImage = await Image.create({ image_url, machineId });
    res.status(201).send({ message: "Image uploaded", newImage });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};


module.exports = {
  addImage
};
