const { sendErrorresponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).send({
      message: "New category added",
      newCategory,
    });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send(category);
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    category.name = name || category.name;
    await category.save();

    res.send({
      message: "Category updated",
      category,
    });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    await category.destroy();

    res.send({ message: "Category deleted" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
