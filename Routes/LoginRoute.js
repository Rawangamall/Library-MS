const express=require("express");
const multer = require('multer');
const upload = multer();
const router=express.Router();

const loginController=require("../Controllers/LoginController");
  
router.route("/login")
      .post(upload.none(),loginController.login);

router.route("/forgetpassword")
       .post(upload.none(),loginController.forgetpassword);

router.route("/resetpassword/:code")
      .patch(upload.none(),loginController.resetpassword);

   
module.exports=router;