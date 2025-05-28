const { sendErrorresponse } = require("../helpers/send_error_response");
const Status = require("../models/status.model");

const addStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const newStatus = await Status.create({ name });
    res.status(201).send({
      message: "New status added",
      newStatus,
    });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.send(statuses);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }
    res.send(status);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }

    status.name = name || status.name;
    await status.save();

    res.send({
      message: "Status updated",
      status,
    });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }

    await status.destroy();

    res.send({ message: "Status deleted" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addStatus,
  getAllStatuses,
  getStatus,
  updateStatus,
  deleteStatus,
};
