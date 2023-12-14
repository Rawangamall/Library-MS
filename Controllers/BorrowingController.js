const JWT= require("jsonwebtoken");
const { promisify } = require("util")
const { Op } = require('sequelize');

const Operation = require("./../Models/BorrowingModel");
const User = require("./../Models/UserModel");
const Book = require("./../Models/BookModel");

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");
const sequelize = require('../Utils/dbConfig');

exports.addOperation = CatchAsync(async (request, response, next) => {
    
 let token;
 if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
    token = request.headers.authorization.split(' ')[1];
 }
 if(!token){
    return next(new AppError('You\'re not logged in, please go to login page',401));
 }

const decoded = await promisify(JWT.verify)(token,process.env.JWT_SECRET);

const userId = decoded.id
const bookId = request.params.id

    const book = await Book.findByPk(bookId);
    if (!book || book.availableQuantity === 0) {
      return response.status(400).json({ message: 'No available copies of this book' });
    }

    const transaction = await sequelize.transaction();
    try {
      await Book.decrement('availableQuantity', { by: 1, where: { ISBN: bookId }, transaction });
      await Operation.create({ bookId, borrowerId: userId }, { transaction });
     
      await transaction.commit();
      return response.status(201).json({ message: 'Borrowing successful!' });
    
    } catch (error) {

    await transaction.rollback();

     if (error.name === 'SequelizeUniqueConstraintError') {
        response.status(400).json({ message: 'You have already borrowed this book!' });
       } 
    }

});
