import jwt from "jsonwebtoken";

export const createAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN, {
    expiresIn: "1d",
  });
};
