const express=require("express");
const router=express.Router();
const multer = require('multer');
const upload = multer();

const BookController=require("./../Controllers/BookController");
const BorrowingController=require("./../Controllers/BorrowingController");
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

router.route("/borrowedBooks")
      .get(BorrowingController.listBorrowBooks)

router.route("/overdue")
      .get(BorrowingController.listOverdueBooks)

router.route("/dueDate")
      .get(BorrowingController.listdueDateBooks)

router.route("/exportBorrowedBooks")
      .get(BorrowingController.exportBorrowingOperations)

router.route("/exportBorrowed/LastMonth")
      .get(BorrowingController.exportLastMonthBorrowing)

router.route("/exportoverDue/LastMonth")
      .get(BorrowingController.exportLastMonthoverDue)

 module.exports=router;