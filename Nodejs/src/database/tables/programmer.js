const sequelize = require("sequelize");
const database = require("../db");

const programmer = database.define("programmer", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  javascript: {
    type: sequelize.BOOLEAN,
    allowNull: false,
  },
  java: {
    type: sequelize.BOOLEAN,
    allowNull: false,
  },

  python: {
    type: sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = programmer;
