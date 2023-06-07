const jwt = require("jsonwebtoken");
const { siswa } = require("../models");

exports.authToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: err.message,
        });
      }

      const siswaVerified = await User.findOne({
        where: {
          id: decoded.id,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });

      if (!siswaVerified) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      }

      req.siswa = siswaVerified.dataValues;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
