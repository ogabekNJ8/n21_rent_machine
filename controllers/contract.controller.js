const Contract = require("../models/contract.model");
const Machine = require("../models/machine.model");
const User = require("../models/user.model");
const Status = require("../models/status.model");
const Commission = require("../models/commission.model");
const { sendErrorresponse } = require("../helpers/send_error_response");
const Payment = require("../models/payment.model");
const { Op } = require("sequelize");

const addContract = async (req, res) => {
  try {
    const {
      total_price,
      date,
      machineId,
      userId,
      statusId,
      commissionId,
      start_time,
      end_time,
      total_time,
    } = req.body;

    const [machine, user, status, commission] = await Promise.all([
      Machine.findByPk(machineId),
      User.findByPk(userId),
      Status.findByPk(statusId),
      Commission.findByPk(commissionId),
    ]);

    if (!machine || !user || !status || !commission) {
      return sendErrorresponse(
        { message: "Machine, User, Status yoki Commission topilmadi" },
        res,
        404
      );
    }

    const contract = await Contract.create({
      total_price,
      date,
      machineId,
      userId,
      statusId,
      commissionId,
      start_time,
      end_time,
      total_time,
    });

    res.status(201).json({ message: "Shartnoma yaratildi", contract });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        { model: Machine, attributes: ["name"] },
        { model: User, attributes: ["full_name", "email"] },
        { model: Status, attributes: ["name"] },
        { model: Commission, attributes: ["percent"] },
        { model: Payment, attributes: ["amount", "payment_date", "status"] },
      ],
    });

    res.status(200).json({ contracts });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id, {
      include: [
        { model: Machine, attributes: ["name"] },
        { model: User, attributes: ["full_name", "email"] },
        { model: Status, attributes: ["name"] },
        { model: Commission, attributes: ["percentage"] },
      ],
    });

    if (!contract) {
      return sendErrorresponse({ message: "Shartnoma topilmadi" }, res, 404);
    }

    res.status(200).json({ contract });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);

    if (!contract) {
      return sendErrorresponse({ message: "Shartnoma topilmadi" }, res, 404);
    }

    await contract.update(req.body);

    res.status(200).json({ message: "Shartnoma yangilandi", contract });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);

    if (!contract) {
      return sendErrorresponse({ message: "Shartnoma topilmadi" }, res, 404);
    }

    await contract.destroy();

    res.status(200).json({ message: "Shartnoma o'chirildi" });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getByStatus = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;

    if (!start_time || !end_time) {
      return res
        .status(400)
        .json({ message: "start_time va end_time talab qilinadi" });
    }

    const contracts = await Contract.findAll({
      include: [
        {
          model: Status,
          where: { name: "Cancelled" },
        },
      ],
      where: {
        date: {
          [Op.between]: [new Date(start_time), new Date(end_time)],
        },
      },
    });

    res.json(contracts);
  } catch (error) {
    sendErrorresponse(error, res, 400)
  }
}

module.exports = {
  addContract,
  getAllContracts,
  getContract,
  updateContract,
  deleteContract,
  getByStatus,
};
