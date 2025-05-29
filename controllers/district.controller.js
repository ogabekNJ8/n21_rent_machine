const { sendErrorresponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");

const addDistrict = async (req, res) => {
  try {
    const { name, regionId } = req.body;

    const region = await Region.findByPk(regionId);
    if (!region) {
      return sendErrorresponse(
        { message: "Bunday region mavjud emas" },
        res,
        400
      );
    }

    const newDistrict = await District.create({
      name,
      regionId,
    });

    res.status(201).json({
      message: "Yangi tuman muvaffaqiyatli qo'shildi",
      district: newDistrict,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};


const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.findAll({
      include: [
        {
          model: Region,
          attributes: ["id", "name"], // kerakli atributlar
        },
      ],
      attributes: ["id", "name"],
    });
    res.send(districts);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id, {
      include: [
        {
          model: Machine,
          attributes: ["name", "price_per_hour", "is_available"],
        },
        {
          model: Region,
          attributes: ["name"],
        },
      ],
    });
    if (!district) {
      return res.status(404).send({ message: "District not found" });
    }
    res.send(district);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).send({ message: "District not found" });
    }

    district.name = name || district.name;
    await district.save();

    res.send({
      message: "District updated",
      district,
    });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).send({ message: "District not found" });
    }

    await district.destroy();

    res.send({ message: "District deleted" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

Region.hasMany(District),
District.belongsTo(Region)

module.exports = {
  addDistrict,
  getAllDistricts,
  getDistrict,
  updateDistrict,
  deleteDistrict,
};
