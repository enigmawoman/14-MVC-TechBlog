const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Comment extends Model {}

// set up fields and rules for Product model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // user_name: {
    //   type: DataTypes.STRING,
    //   // prevents null values
    //   allowNull: false,
    // },
    // date_posted:{
    //     type: DataTypes.DATEONLY,
    //     allowNull: false,
    // },
    user_comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;
