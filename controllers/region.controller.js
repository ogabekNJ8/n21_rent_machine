const { sendErrorresponse } = require("../helpers/send_error_response");
const Region = require("../models/region.model");

const addRegion = async (req, res) => {
  try {
    const { name } = req.body;
    const newRegion = await Region.create({ name });
    res.status(201).send({ message: "New region added", newRegion });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll();
    res.send(regions);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }
    res.send(region);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }
    region.name = name || region.name;
    await region.save();
    res.send({ message: "Region updated", region });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }
    await region.destroy();
    res.send({ message: "Region deleted" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addRegion,
  getAllRegions,
  getRegion,
  updateRegion,
  deleteRegion,
};
