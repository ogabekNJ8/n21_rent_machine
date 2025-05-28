const { sendErrorresponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");

const addDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const newDistrict = await District.create({ name });
    res.status(201).send({
      message: "New district added",
      newDistrict,
    });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.findAll();
    res.send(districts);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id);
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

module.exports = {
  addDistrict,
  getAllDistricts,
  getDistrict,
  updateDistrict,
  deleteDistrict,
};
