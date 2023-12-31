const User = require("./../Models/UserModel");
const Operation = require("./../Models/BorrowingModel")

const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

exports.addUser = CatchAsync(async (request, response, next) => {

    const hash = await bcrypt.hash(request.body.password, salt);
    const newUser = await User.create({
      Name:request.body.name,
      email: request.body.email,
      password:hash,
    });

    response.status(201).json(newUser);
  });

  
  exports.getAllUsers = CatchAsync(async (request, response, next) => {

      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;
      const searchKey = request.query.searchkey || "";
  
      const whereClause = searchKey ? {
        [Op.or]: [
          { Name: { [Op.like]: `%${searchKey}%` } },
          { createdAt: { [Op.like]: `%${searchKey}%` } },
          { email: { [Op.like]: `%${searchKey}%` } },
        ],
      } : {};
  
      
      const attributes = ['id', 'Name', 'role', 'email', 'createdAt'];
  
      const { docs, pages, total } = await User.paginate({
        attributes,
        where: whereClause,
        page,
        paginate: limit,
      });
    
      response.status(200).json({
        users: docs,
        currentPage: page,
        totalPages: pages,
        totalUsers: total,
      });
  }
);

exports.getUser = CatchAsync(async (request, response, next) => {

  const id = request.params.id;

  const attributes = [ 'Name' , 'email', 'role', 'createdAt'];
  const user = await User.findByPk(id, { attributes });

  if(!user){
    return next(new AppError(`User not found`, 401));
  }

  response.status(200).json(user);     
  });


exports.editUser = CatchAsync(async (request, response, next) => {
   
    const id = request.params.id;

    if (request.body.password) {

      const hash = await bcrypt.hash(request.body.password, salt);
      request.body.password = hash;
    }
  
    const user = await User.findByPk(id);

    if(!user){
      return next(new AppError(`User not found`, 401));
    }
    
     await user.update({
      Name:request.body.name,
      email: request.body.email,
      password:request.body.password,
    });

    response.status(200).json({message:"Updated"});
  });
  
exports.delUser = CatchAsync(async (request, response, next) => {
  const id = request.params.id;


  const user = await User.findByPk(id);

  if (!user) {
    return next(new AppError(`User not found`, 401));
  }

  
const userOperations = await Operation.findAll({
  where: {
    borrowerId: user.id,
    returned: false,
  }
});

if(userOperations.length != 0){
  return next(new AppError(`Account can't be deleted before returning the borrowed books`, 400));
}else{
  await user.destroy();
}

  response.status(200).json({ message: 'User deleted successfully' });  
}); 

