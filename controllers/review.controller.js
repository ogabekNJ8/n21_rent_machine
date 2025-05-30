const { sendErrorresponse } = require("../helpers/send_error_response");
const Review = require("../models/review.model");
const User = require("../models/user.model");
const Machine = require("../models/machine.model");

const addReview = async (req, res) => {
  try {
    const { rating, comment, machineId, userId } = req.body;

    const machine = await Machine.findByPk(machineId);
    const user = await User.findByPk(userId);

    if (!machine || !user) {
      return sendErrorresponse(
        { message: "Machine yoki User topilmadi" },
        res,
        400
      );
    }

    const review = await Review.create({
      rating,
      comment,
      created_at: new Date(),
      machineId,
      userId,
    });

    res.status(201).json({
      message: "Fikr bildirildi",
      review,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, attributes: ["full_name", "email"] },
        { model: Machine, attributes: ["name"] },
      ],
    });

    res.status(200).json({ reviews });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id, {
      include: [
        { model: User, attributes: ["full_name", "email"] },
        { model: Machine, attributes: ["name"] },
      ],
    });

    if (!review) {
      return sendErrorresponse({ message: "Fikr topilmadi" }, res, 404);
    }

    res.status(200).json({ review });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (!review) {
      return sendErrorresponse({ message: "Fikr topilmadi" }, res, 404);
    }

    await review.update(req.body);

    res.status(200).json({
      message: "Fikr yangilandi",
      review,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (!review) {
      return sendErrorresponse({ message: "Fikr topilmadi" }, res, 404);
    }

    await review.destroy();

    res.status(200).json({ message: "Fikr o'chirildi" });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

module.exports = {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
