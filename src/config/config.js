const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bereana", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
