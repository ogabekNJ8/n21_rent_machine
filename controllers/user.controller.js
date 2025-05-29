const User = require("../models/user.model");
const { sendErrorresponse } = require("../helpers/send_error_response");
const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const UserAddress = require("../models/user.address.model");

const addUser = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorresponse({ message: "Bunday user mavjud" }, res, 400);
    }

    if (password !== confirm_password) {
      return sendErrorresponse({ message: "Bunday user mavjud" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await User.create({
      full_name,
      phone,
      email,
      hashed_password,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserAddress,
          attributes: ["name", "address"],
        },
        {
          // machine
        }
      ],
      attributes: ["full_name", "phone"],
    });
    res.status(200).json(users);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, hashed_password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ full_name, phone, email, hashed_password });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
