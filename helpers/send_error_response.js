const sendErrorresponse = (error, res, status) => {
  // console.log(error);
  res.status(status).send({ message: "Xatolik", error: error.message });
};

module.exports = {
  sendErrorresponse,
};
