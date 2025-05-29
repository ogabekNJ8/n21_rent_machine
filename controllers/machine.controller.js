const { sendErrorresponse } = require("../helpers/send_error_response");
const Machine = require("../models/machine.model")
const User = require("../models/user.model")
const Region = require("../models/region.model")
const District = require("../models/district.model")
const Category = require("../models/category.model");
const Image = require("../models/image.model");

const addMachine = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    } = req.body;

    const user = await User.findByPk(userId);
    const region = await Region.findByPk(regionId);
    const district = await District.findByPk(districtId);
    const category = await Category.findByPk(categoryId);

    if (!user || !region || !district || !category) {
      return sendErrorresponse(
        {
          message: "Owner, Region, District yoki Category topilmadi",
        },
        res,
        400
      );
    }

    const machine = await Machine.create({
      name,
      price_per_hour,
      description,
      is_available,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    });

    res.status(201).json({
      message: "Yangi texnika qo'shildi",
      machine,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.findAll({
      include: [
        { model: User, attributes: ["full_name", "email"], as: "user" },
        { model: Region, attributes: ["name"] },
        { model: District, attributes: ["name"] },
        { model: Category, attributes: ["name"] },
      ],
    });

    res.status(200).json({ machines });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const getMachine = async (req, res) => {
  try {
    const { id } = req.params;

    const machine = await Machine.findByPk(id, {
      include: [
        { model: User, attributes: ["full_name", "email"], as: "user" },
        { model: Region, attributes: ["name"] },
        { model: District, attributes: ["name"] },
        { model: Category, attributes: ["name"] },
        { model: Image, attributes: ["image_url"] },
      ],
    });

    if (!machine) {
      return sendErrorresponse({ message: "Texnika topilmadi" }, res, 404);
    }

    res.status(200).json({ machine });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const updateMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machine.findByPk(id);

    if (!machine) {
      return sendErrorresponse({ message: "Texnika topilmadi" }, res, 404);
    }

    await machine.update(req.body);

    res.status(200).json({
      message: "Texnika muvaffaqiyatli yangilandi",
      machine,
    });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const deleteMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machine.findByPk(id);

    if (!machine) {
      return sendErrorresponse({ message: "Texnika topilmadi" }, res, 404);
    }

    await machine.destroy();

    res.status(200).json({ message: "Texnika o'chirildi" });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

module.exports = {
  addMachine,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
};
