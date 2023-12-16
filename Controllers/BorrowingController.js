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

      //in case that he returned the book and want to borrow again 
      const existingOperation = await Operation.findOne({
         where: {
           bookId: bookId,
           borrowerId: userId,
           returned: true, 
         },
       });
 
       if (existingOperation) {

          existingOperation.returned = false;
          const currentDate = new Date();
          existingOperation.dueDate =new Date(currentDate.setDate(currentDate.getDate() + 14));
         
          await existingOperation.save();
          await Book.decrement('availableQuantity', { by: 1, where: { ISBN: bookId } });

         return response.status(201).json({ message: 'Borrowing successful!' });
       }else{
        response.status(400).json({ message: 'You have already borrow this book!' });
       }
      } 
    }

});


exports.returnBook = CatchAsync(async (request, response, next) => {
    
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

  const operation = await Operation.findOne({
   where: {
      bookId: bookId,
      borrowerId: userId,
      returned: false,
    }
   });
    
    if(!operation){
      return next(new AppError('No matching borrow operation or book already returned',400));
    }


     await sequelize.transaction(async (t) => {
      operation.returned = true
      await operation.save();   

      await Book.increment('availableQuantity', { by: 1, where: { ISBN: bookId }, transaction: t });
    });

    return response.status(200).json({ message: 'Borrowed book is returned now' });

});

exports.ListUserOperations = CatchAsync( async (request, response, next) =>{
const userID = request.params.id;

const userOperations = await Operation.findAll({
   where: {
     borrowerId: userID,
     returned: false,
   },
   include: [Book],
 });

if(userOperations.length == 0){
   return response.status(400).json({message:"There's no borrow books!"})
}

response.status(200).json(userOperations)

})



exports.listOverdueBooks = CatchAsync(async (request, response, next) => {
     const currentDate = new Date(); 
 
     const overdueOperations = await Operation.findAll({
       where: {
         dueDate: { [Op.lt]: currentDate }, 
         returned: false, 
       },
       include: [Book , User], 
     });
 
     return response.status(200).json({ overdueOperations });
 
 });
 

 
exports.listdueDateBooks = CatchAsync(async (request, response, next) => {
  const currentDate = new Date(); 

  const dueOperations = await Operation.findAll({
    where: {
      dueDate: { [Op.gte]: currentDate }, 
      returned: false, 
    },
    include: [Book , User], 
  });

  return response.status(200).json( dueOperations );

});

exports.listBorrowBooks = CatchAsync(async (request, response, next) => {

  const dueOperations = await Operation.findAll({
    where: {
      returned: false, 
    },
    include: [Book , User], 
  });

  return response.status(200).json( dueOperations );

});
