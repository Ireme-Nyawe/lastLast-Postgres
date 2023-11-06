import db from "../db/models"

const userModel = db['users'];
import Jwt from "jsonwebtoken";
const Authorization = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(404).json({
        status: "404",
        message: "This Operation Require User Login,  Please Login",
      });
    }

    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const logedUser = await userModel.findByPk(decoded.id);

    if (!logedUser) {
      res.status(403).json({
        status: "403",
        message: "Token has Expired Please login Again",
      });
    }

    if (logedUser.role !== "user") {
      res.status(404).json({
        status: "404",
        message: "Only Loged Users Allowed To  Do This Operation",
      });
    } else {
      req.userModel = logedUser;
      next();
    }

  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};

export default Authorization;