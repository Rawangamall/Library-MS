-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2023 at 02:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `borrowing operations`
--

CREATE TABLE `borrowing operations` (
  `bookId` int(11) NOT NULL,
  `borrowerId` int(11) NOT NULL,
  `dueDate` date NOT NULL,
  `returned` tinyint(1) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowing operations`
--

INSERT INTO `borrowing operations` (`bookId`, `borrowerId`, `dueDate`, `returned`, `createdAt`, `updatedAt`) VALUES
(1, 2, '2023-11-05', 0, '2023-11-01', '2023-12-16'),
(2, 2, '2023-12-22', 0, '2023-12-16', '2023-12-16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrowing operations`
--
ALTER TABLE `borrowing operations`
  ADD PRIMARY KEY (`bookId`,`borrowerId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
