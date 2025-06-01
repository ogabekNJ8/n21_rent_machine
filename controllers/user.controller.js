const User = require("../models/user.model");
const Role = require("../models/role.model");
const { sendErrorresponse } = require("../helpers/send_error_response");
const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const UserAddress = require("../models/user.address.model");
const sequelize = require("../config/db");

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
          model: Role,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      attributes: ["id", "full_name", "phone"],
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

const getMachine = async (req, res) => {
  try {
    const {
      full_name,
      start_time,
      end_time,
      category_name,
      district_name
    } = req.body;

    const [machines] = await sequelize.query(
      `SELECT 
        u.full_name,
        m.name AS machine_name,
        m.price_per_hour,
        c.start_time,
        c.end_time,
        d.name AS district_name,
        ctg.name AS category_name
      FROM "user" u
      LEFT JOIN contract c ON u.id = c."userId"
      LEFT JOIN machine m ON c."machineId" = m.id
      LEFT JOIN category ctg ON m."categoryId" = ctg.id
      LEFT JOIN district d ON m."districtId" = d.id
      WHERE u.full_name ILIKE $1
        AND c.start_time <= $3
        AND c.end_time >= $2
        AND ctg.name ILIKE $4
        AND d.name ILIKE $5
    `,
      {
        bind: [
          `%${full_name}%`,
          start_time,
          end_time,
          `%${category_name}%`,
          `%${district_name}%`,
        ],
      }
    );         

    if (!machines.length) {
      return sendErrorresponse({message: "Mavjud emas"}, res, 400)
    }

    res.status(200).send({ machines });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getMachine,
};
