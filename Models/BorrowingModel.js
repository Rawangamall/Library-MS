const { DataTypes } = require('sequelize');
const SequelizePaginate = require('sequelize-paginate');
const sequelize = require('../Utils/dbConfig');
const Book = require("./BookModel")
const User = require("./UserModel")

const Borrowing = sequelize.define('borrowing operations', {
    bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Book, 
          key: 'ISBN', 
        }
      },
      borrowerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: User, 
          key: 'id', 
        }
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + 14); // Adding 14 days
          return currentDate;
        },
      },
    returned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
     timestamps: false, 
     uniqueKeys: {
      unique_borrowing: {
        fields: ['bookId', 'borrowerId'], // Define a unique key on bookId and borrowerId
      },
    }
  });
  
  // Associations
  Book.hasMany(Borrowing, { foreignKey: 'bookId' });
  Borrowing.belongsTo(Book, { foreignKey: 'bookId' });
  
  User.hasMany(Borrowing, { foreignKey: 'borrowerId' });
  Borrowing.belongsTo(User, { foreignKey: 'borrowerId' });
  
SequelizePaginate.paginate(Borrowing);
module.exports = Borrowing;