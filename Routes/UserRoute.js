const express=require("express");
const router=express.Router();
const multer = require('multer');
const upload = multer();

const userController=require("./../Controllers/UserController");
const BorrowingController=require("./../Controllers/BorrowingController");
const validationData = require("./../Core/Validations/User")
const validationMW = require("./../Middlewares/validateMW")
const auth = require("./../Middlewares/authenticationMW").auth
const authorize = require("./../Middlewares/authorizationMW").authorize
const limitMW = require("./../Middlewares/rateLimitMW")

router.route("/register")
      .post(upload.none(),validationData.UserValidPOST,validationMW,userController.addUser) 

router.route("/users")
      .get(auth,authorize(["borrower","employee"]),limitMW.rateLimit,userController.getAllUsers)   //should be authorized for employee only but for the test

router.route("/user/:id")
      .get(auth,authorize(["borrower","employee"]),limitMW.rateLimit,userController.getUser)  
      .patch(upload.none(),auth,authorize(["borrower"]),validationData.UserValidPATCH,validationMW,userController.editUser)
      .delete(auth,authorize(["borrower","employee"]),userController.delUser) 

router.route("/borrow/:id")
      .post(upload.none(),auth,authorize(["borrower"]),BorrowingController.addOperation) 
      .patch(upload.none(),auth,authorize(["borrower","employee"]),BorrowingController.returnBook)
      .get(auth,authorize(["borrower","employee"]),BorrowingController.ListUserOperations)


      module.exports=router;