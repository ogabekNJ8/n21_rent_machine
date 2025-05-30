const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });

    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}

let authorJwtService = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);

// let adminJwtService = new JwtService(
//   config.get("adminAccess_key"),
//   config.get("adminRefresh_key"),
//   config.get("adminAccess_time"),
//   config.get("adminRefresh_time")
// );

// let userJwtService = new JwtService(
//   config.get("userAccess_key"),
//   config.get("userRefresh_key"),
//   config.get("userAccess_time"),
//   config.get("userRefresh_time")
// );

module.exports = {
  authorJwtService,
  // userJwtService,
  // adminJwtService,
};
