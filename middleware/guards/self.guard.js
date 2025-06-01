const { sendErrorresponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    const user = req.user;
    const roles = user?.roles || [];
    const isAdmin = roles.some((role) => role.name === "admin");
    const targetId = parseInt(req.params.id); // 👈 bu yerga e’tibor!

    if (!user || !user.id) {
      return sendErrorresponse(
        "Token noto‘g‘ri yoki foydalanuvchi aniqlanmadi",
        res,
        401
      );
    }

    if (isNaN(targetId)) {
      return sendErrorresponse("ID noto‘g‘ri", res, 400);
    }

    if (isAdmin || user.id === targetId) {
      return next(); // ✅ ruxsat beriladi
    }

    return sendErrorresponse(
      "Siz faqat o'zingizning ma'lumotlaringizga kira olasiz",
      res,
      403
    );
  } catch (error) {
    sendErrorresponse(error, res, 403);
  }
};
