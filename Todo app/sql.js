const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with MySQL
const sequelize = new Sequelize('todoapp', 'root', 'Alpha@321', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

// Define the Todo model
const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Sync the model with the database
sequelize.sync();

module.exports = {
  sequelize,
  Todo
};
