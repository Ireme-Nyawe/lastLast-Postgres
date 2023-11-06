require("dotenv").config();
module.exports = {
  development: {
    url: process.env.DbC,
    dialect: "postgress",
  },
  test: {
    url: process.env.DbC,
    dialect: "postgress",
  },
  production: {
    url: process.env.DbC,
    dialect: "postgress",
  },
};