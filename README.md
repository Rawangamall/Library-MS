# Library Management System

This project aims to create a straightforward  efficient library management system that effectively handles book management, borrower registration, and borrowing processes. It's implemented in Node.js, utilizing a MySQL database managed through Sequelize.

## Database Setup

The SQL database  file can be found in the [Material/database setup](./Material/database%20setup).
It contains the necessary SQL script to set up the database for this system.

### Schema Diagram

The schema diagram illustrating the database structure is available in the `Material` folder.

 ## For Documenation instructions:
- **Postman Documentation link:** [API Documentation](https://documenter.getpostman.com/view/26421829/2s9Ykn8gn4)

 ## Test Cases
For comprehensive testing of the application on login module, [test case.xlsx](./Material/test%20case.xlsx).


## Bonus Achievements (Implemented)

- **Analytical Reports:** Generates borrowing process reports within a specific period and exports data in CSV or Xlsx formats.
- **Export Overdue Borrows:** Exports all overdue borrows from the previous month.
- **Export Borrowing Processes:** Provides the ability to export borrowing processes from the last month.
- **Rate limiting for the API to prevent abuse:** Implemented on two apis 1-User Profile 2-List All users (by allowing only 5 request and after 1 min it'll be reset).
- **Implement basic authentication:** Authentaction implemented using token JWT.
- **Test Case:** Login Module


To run the application, use the following command:

```bash
npm start
