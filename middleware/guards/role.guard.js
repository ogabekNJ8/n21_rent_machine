const { sendErrorresponse } = require("../../helpers/send_error_response");
const { authorJwtService } = require("../../services/jwt.service");

module.exports = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      console.log(requiredRoles);
      console.log(req.user.roles);

      const userRoles = req.user.roles      
      const ruxsat = userRoles.some((role) =>
        requiredRoles.includes(role.name)
      );

      if (!ruxsat) {
        return sendErrorresponse({message: "Sizda ruxsat yo'q"}, res, 403);
      }
      console.log("18");

      next();
    } catch (error) {
      sendErrorresponse(error, res, 403);
    }
  };
};
