const express=require("express");
const router=express.Router();
const multer = require('multer');
const upload = multer();

const userController=require("./../Controllers/UserController");
const validationData = require("./../Core/Validations/User")
const validationMW = require("./../Middlewares/validateMW")
const auth = require("./../Middlewares/authenticationMW").auth
const authorize = require("./../Middlewares/authorizationMW").authorize

router.route("/register")
      .post(upload.none(),validationData.UserValidPOST,validationMW,userController.addUser) 

router.route("/users")
      .get(auth,authorize(["employee"]),userController.getAllUsers)  

router.route("/user/:id")
      .get(auth,authorize(["borrower","employee"]),userController.getUser)  
      .patch(upload.none(),auth,authorize(["borrower","employee"]),validationData.UserValidPATCH,validationMW,userController.editUser)
      .delete(auth,authorize(["borrower","employee"]),userController.delUser) 

module.exports=router;