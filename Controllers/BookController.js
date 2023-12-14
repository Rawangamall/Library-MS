const Book = require("./../Models/BookModel");

const { Op } = require('sequelize');
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");


exports.addBook = CatchAsync(async (request, response, next) => {

    const {floor , section , shelf} = request.body
    
    const newBook = await Book.create({
      title:request.body.title,
      author: request.body.author,
      availableQuantity:parseInt(request.body.quantity),
      shelfLocation : floor + "-" + section + "-" + shelf
    });

    response.status(201).json(newBook);
  });

  exports.editBook = CatchAsync(async (request, response, next) => {
    const id = request.params.id;
    const book = await Book.findByPk(id);
  
    if (!book) {
      return next(new AppError('Book not found', 404));
    }
  
    const { title, author, quantity, floor, section, shelf } = request.body;
  
    if (title) {
      book.title = title;
    }
    if (author) {
      book.author = author;
    }
    if (quantity) {
      book.availableQuantity = parseInt(quantity);
    }
    if (floor) {
        book.shelfLocation = `${floor}-${book.shelfLocation.split('-')[1]}-${book.shelfLocation.split('-')[2]}`;
      }
    if (section) {
    book.shelfLocation = `${book.shelfLocation.split('-')[0]}-${section}-${book.shelfLocation.split('-')[2]}`;
    }
    if (shelf) {
    book.shelfLocation = `${book.shelfLocation.split('-')[0]}-${book.shelfLocation.split('-')[1]}-${shelf}`;
    }
  
    await book.save();
  
    response.status(200).json({ message: 'Book updated' });
  });
  
  
  exports.deleteBook = CatchAsync(async (request, response, next) => {
    const bookId = request.params.id;
  
    const deletedBook = await Book.findByPk(bookId);
    if (!deletedBook) {
        return next(new AppError(`Book not found`, 401));
    }
  
    await deletedBook.destroy();
  
    response.status(200).json({message:"deleted"});
  });
  
  
exports.getBook = CatchAsync(async (request, response, next) => {

    const id = request.params.id;  
    const book = await Book.findByPk(id);
  
    if(!book){
      return next(new AppError(`book not found`, 401));
    }
  
    response.status(200).json(book);     
    });
  

//list all books with search functionality
exports.getAllBook = CatchAsync(async (request, response, next) => {
    const { searchQuery } = request.query; 
    
    let books;
    if (searchQuery) {
        books = await Book.findAll({
        where: {
            [Op.or]: [
            { title: { [Op.like]: `%${searchQuery}%` } },
            { author: { [Op.like]: `%${searchQuery}%` } },
            { ISBN: { [Op.like]: `%${searchQuery}%` } },
            ],
        },
        });
    } else {
        books = await Book.findAll();
    }
    
    if (!books || books.length === 0) {
        return next(new AppError('Books not found', 404));
    }
    
    response.status(200).json(books);
});
      

//for search bar
exports.searchBooks = CatchAsync(async (request, response, next) => {
    const { searchQuery } = request.query; 
    const foundBooks = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchQuery}%` } },
          { author: { [Op.like]: `%${searchQuery}%` } },
          { ISBN: { [Op.like]: `%${searchQuery}%` } },
        ],
      },
    });
  
    response.status(200).json(foundBooks);
  });
  