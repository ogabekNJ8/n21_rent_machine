const { sendErrorresponse } = require("../helpers/send_error_response");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { userJwtService, authorJwtService } = require("../services/jwt.service");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    if (!user) {
      return sendErrorresponse(
        { message: "Email yoki password noto'g'ri" },
        res,
        400
      );
    }

    const verifiedPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!verifiedPassword) {
      return sendErrorresponse(
        { message: "Email yoki password noto'g'ri" },
        res,
        400
      );
    }
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = authorJwtService.generateTokens(payload);

    const hashed_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });

    res
      .status(200)
      .send({ message: "User logged in", accessToken: tokens.accessToken });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const decodedToken = await authorJwtService.verifyRefreshToken(
      refreshToken
    );

    const user = await User.update(
      { hashed_token: null },
      {
        where: { id: decodedToken.id },
        returning: true,
      }
    );

    if (!user) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "User logged out" });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const decodedToken = await authorJwtService.verifyRefreshToken(
      refreshToken
    );
    const user = await User.findByPk(decodedToken.id, {
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    if (!user) {
      return res.status(400).send({ message: "Bunday tokenli user topilmadi" });
    }
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = authorJwtService.generateTokens(payload);

    const hashed_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });

    res
      .status(200)
      .send({ message: "Tokenlar yangilandi", accessToken: tokens.accessToken });
  } catch (error) {
    sendErrorresponse(error, res, 400);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};
