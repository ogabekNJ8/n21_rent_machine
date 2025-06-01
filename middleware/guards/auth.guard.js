const { sendErrorresponse } = require("../../helpers/send_error_response");
const { authorJwtService } = require("../../services/jwt.service");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return sendErrorresponse({ message: "Authorization header not found" }, res, 401);
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: "Bearer token not found" });
    }

    const decodedPayload = await authorJwtService.verifyAccessToken(token);

    req.user = decodedPayload;

    next();
  } catch (error) {
    sendErrorresponse(error, res, 403);
  }
};
