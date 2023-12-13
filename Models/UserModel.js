const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const SequelizePaginate = require('sequelize-paginate');
const sequelize = require('../Utils/dbConfig');

 const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  Name:DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: "borrower",
    allowNull: false
  },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Invalid email format'
      }
    },
    unique: true
  },
  password: { type: DataTypes.STRING, allowNull: false },
  code: DataTypes.STRING,
  passwordResetExpires: DataTypes.DATE
}, {
  timestamps: true,   // registered date = created At
});

User.prototype.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


User.prototype.createPasswordRandomToken = async function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.code = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min from now

  await this.save(); 

  return resetToken;
};

SequelizePaginate.paginate(User);
module.exports = User;