const { DataTypes } = require('sequelize');
const SequelizePaginate = require('sequelize-paginate');
const sequelize = require('../Utils/dbConfig');


const Book = sequelize.define('books', {
    ISBN: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availableQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      shelfLocation: {
        type: DataTypes.STRING,  //Hierarchical Codes as Floor-Section-Shelf : 2-3A-105
        allowNull: false,
        unique: true,
      }
    },
   {
      timestamps: false, 
   });


SequelizePaginate.paginate(Book);
module.exports = Book;