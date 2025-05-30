const User = require("../models/user.model");
const { sendErrorresponse } = require("../helpers/send_error_response");
const Role = require("../models/role.model");

const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const lowerCaseName = name.toLowerCase();

    const position = await Role.findOne({ where: { name: lowerCaseName } });
    if (position) {
      return sendErrorresponse({ message: "Bunday role mavjud" }, res, 400);
    }

    const newRole = await Role.create({
      name: lowerCaseName,
      description,
    });

    res.status(201).json({
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};


const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name"]
        },
      ],
      attributes: ["name"]
    });
    res.status(200).json(roles);
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
  addRole,
  getAllRoles,
  getUser,
  updateUser,
  deleteUser,
};
