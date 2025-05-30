const Payment = require("../models/payment.model");
const Contract = require("../models/contract.model");
const { sendErrorresponse } = require("../helpers/send_error_response");

const addPayment = async (req, res) => {
  try {
    const { contractId, payment_date, payment_status, amount, status } =
      req.body;

    const contract = await Contract.findByPk(contractId);
    if (!contract) {
      return sendErrorresponse({ message: "Contract topilmadi" }, res, 404);
    }

    const payment = await Payment.create({
      contractId,
      payment_date,
      payment_status,
      amount,
      status,
    });

    res.status(201).json({
      message: "To'lov muvaffaqiyatli qo'shildi",
      payment,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: {
        model: Contract,
        attributes: ["id", "total_price", "date"],
      },
    });
    res.status(200).json({ payments });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id, {
      include: {
        model: Contract,
        attributes: ["id", "total_price", "date"],
      },
    });

    if (!payment) {
      return sendErrorresponse({ message: "To'lov topilmadi" }, res, 404);
    }

    res.status(200).json({ payment });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return sendErrorresponse({ message: "To'lov topilmadi" }, res, 404);
    }

    await payment.update(req.body);

    res.status(200).json({
      message: "To'lov yangilandi",
      payment,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return sendErrorresponse({ message: "To'lov topilmadi" }, res, 404);
    }

    await payment.destroy();

    res.status(200).json({ message: "To'lov o'chirildi" });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
};
