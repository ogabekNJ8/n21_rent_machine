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

const getUserAddress = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return sendErrorresponse(
        { message: "ID raqam bo‘lishi kerak" },
        res,
        400
      );
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "full_name", "phone"],
    });

    if (!user) {
      return sendErrorresponse(
        { message: "Foydalanuvchi topilmadi" },
        res,
        404
      );
    }

    const addresses = await UserAddress.findAll({
      where: { userId },
      attributes: ["id", "name", "address"],
    });

    return res.status(200).json({
      user,
      addresses,
    });
  } catch (error) {
    return sendErrorresponse(error, res, 500);
  }
};


module.exports = {
  addUserAddress,
  getUserAddresses,
  getUserAddress
};
