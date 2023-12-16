-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2023 at 02:29 PM
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'borrower',
  `password` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `passwordResetExpires` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `Name`, `email`, `role`, `password`, `code`, `passwordResetExpires`, `createdAt`, `updatedAt`) VALUES
(2, 'Rawan gamal', 'rawan.gamaal21@gmail.com', 'borrower', '$2b$10$v2wEni8zKf3cJ0U1gRU/xu.l6KAhFbtWwt0qEE1SeSb1jAeAEx7wW', '37778bb5f70434edc25d14701f3f7d371188579549185f55eb97b5c7be41cfd1', '2023-12-14 19:30:04', '2023-12-13', '2023-12-14'),
(3, 'Youmna gamal', 'belly.gamaal@gmail.com', 'borrower', '$2b$10$uUoUG8T/onOclf77ffxx5.RghcXQ1/CL1NN6nMGDQSuR2ngfcmmHK', NULL, NULL, '2023-12-16', '2023-12-16'),
(4, 'Hana gamal', 'hana.gamaal@gmail.com', 'borrower', '$2b$10$uUoUG8T/onOclf77ffxx5.RghcXQ1/CL1NN6nMGDQSuR2ngfcmmHK', NULL, NULL, '2023-12-16', '2023-12-16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
