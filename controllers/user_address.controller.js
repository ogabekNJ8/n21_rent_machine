const { model } = require("../config/db");
const { sendErrorresponse } = require("../helpers/send_error_response");
const UserAddress = require("../models/user.address.model");
const User = require("../models/user.model");

const addUserAddress = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return sendErrorresponse(
        { message: "Bunday user mavjud emas" },
        res,
        400
      );
    }

    const newUser = await UserAddress.create({
      name,
      address,
      userId,
    });

    res.status(201).json({
      message: "Foydalanuvchiga yangi manzil qo'shildi",
      user: newUser,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const userAddresses = await UserAddress.findAll({
      // include: User,
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["name", "address"],
    });

    res.status(201).json({
      userAddresses,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

module.exports = {
  addUserAddress,
  getUserAddresses,
};
