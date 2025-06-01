const sendErrorresponse = (error, res, status) => {
  res.status(status).send({ error: error.message });
};

module.exports = {
  sendErrorresponse,
};
