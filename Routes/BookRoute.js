const express=require("express");
const router=express.Router();
const multer = require('multer');
const upload = multer();

const BookController=require("./../Controllers/BookController");
const validationData = require("./../Core/Validations/Book")
const validationMW = require("./../Middlewares/validateMW")
const auth = require("./../Middlewares/authenticationMW").auth
const authorize = require("./../Middlewares/authorizationMW").authorize

router.route("/books")
      .post(upload.none(),validationData.BookValidPOST,validationMW,BookController.addBook) 
      .get(BookController.getAllBook)  

router.route("/book/:id")
       .get(BookController.getBook)
       .patch(upload.none(),validationData.BookValidPATCH,validationMW,BookController.editBook)
       .delete(BookController.deleteBook)
 
router.route("/search")
      .get(BookController.searchBooks)
  
 module.exports=router;