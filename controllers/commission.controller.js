const { sendErrorresponse } = require("../helpers/send_error_response");
const Commission = require("../models/commission.model");

const addCommission = async (req, res) => {
  try {
    const { percent } = req.body;
    const newCommission = await Commission.create({ percent });
    res.status(201).send({
      message: "New commission added",
      newCommission,
    });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getAllCommissions = async (req, res) => {
  try {
    const commissions = await Commission.findAll();
    res.send(commissions);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getCommission = async (req, res) => {
  try {
    const { id } = req.params;
    const commission = await Commission.findByPk(id);
    if (!commission) {
      return res.status(404).send({ message: "Commission not found" });
    }
    res.send(commission);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateCommission = async (req, res) => {
  try {
    const { id } = req.params;
    const { percent } = req.body;

    const commission = await Commission.findByPk(id);
    if (!commission) {
      return res.status(404).send({ message: "Commission not found" });
    }

    commission.percent = percent ?? commission.percent;
    await commission.save();

    res.send({
      message: "Commission updated",
      commission,
    });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteCommission = async (req, res) => {
  try {
    const { id } = req.params;
    const commission = await Commission.findByPk(id);
    if (!commission) {
      return res.status(404).send({ message: "Commission not found" });
    }

    await commission.destroy();

    res.send({ message: "Commission deleted" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addCommission,
  getAllCommissions,
  getCommission,
  updateCommission,
  deleteCommission,
};
