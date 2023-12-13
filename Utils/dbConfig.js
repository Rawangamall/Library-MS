const Sequelize = require('sequelize');
const path=require("path"); 
require("dotenv").config({ path: "config.env" });

console.log(process.env.DB_USER)
const sequelize = new Sequelize( 
    "library", "root","",
 { 
  host: "localhost",
  dialect: "mysql", 
});

module.exports = sequelize;