-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2025 at 07:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wworkshopdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `user_id`) VALUES
(1, 'admin', '$2y$10$6CCj1MoZNDyIela/D/zxC.NjYyefDPQjt4Vnt3h8o8HbIVPRVtrpi', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `barber_id` int(11) NOT NULL,
  `service` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `barber_id`, `service`, `date`, `time`, `status`) VALUES
(16, 6, 1, 'Haircut', '2025-07-21', '11:35:00', 'confirmed'),
(17, 1, 4, 'Beard Trim', '2025-07-22', '11:00:00', 'confirmed'),
(18, 6, 3, 'Haircut', '2025-07-21', '12:10:00', 'confirmed'),
(19, 1, 2, 'Shave', '2025-07-21', '11:00:00', 'cancelled');

-- --------------------------------------------------------

--
-- Table structure for table `barbers`
--

CREATE TABLE `barbers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `portfolio` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`portfolio`)),
  `availability` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`availability`)),
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barbers`
--

INSERT INTO `barbers` (`id`, `name`, `portfolio`, `availability`, `status`) VALUES
(1, 'Martin', '[\"Haircut\", \"Beard Trim\", \"Shave\"]', '{\"workDays\": [\"Mon\",\"Tue\",\"Wed\",\"Thu\",\"Fri\",\"Sat\"], \"workHours\": \"11:00-20:00\"}', 'active'),
(2, 'Dorothy', '[\"Haircut\", \"Beard Trim\", \"Shave\"]', '{\"workDays\": [\"Mon\",\"Tue\",\"Wed\",\"Thu\",\"Fri\",\"Sat\"], \"workHours\": \"11:00-20:00\"}', 'active'),
(3, 'Asterio', '[\"Haircut\", \"Beard Trim\", \"Shave\"]', '{\"workDays\": [\"Mon\",\"Tue\",\"Wed\",\"Thu\",\"Fri\",\"Sat\"], \"workHours\": \"11:00-20:00\"}', 'active'),
(4, 'Gylliane', '[\"Haircut\", \"Beard Trim\", \"Shave\"]', '{\"workDays\": [\"Mon\",\"Tue\",\"Wed\",\"Thu\",\"Fri\",\"Sat\"], \"workHours\": \"11:00-20:00\"}', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `proof_image` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','declined') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `proof_image`, `status`) VALUES
(22, 1, '2025-07-16 20:35:58', 'proof_68779cae766ba.jpg', 'declined'),
(23, 1, '2025-07-16 20:39:46', 'proof_68779d9237bc9.jpg', 'approved'),
(24, 1, '2025-07-16 20:41:11', 'proof_68779de752e68.jpg', 'approved'),
(25, 1, '2025-07-16 22:06:31', 'proof_6877b1e7abc19.jpg', 'declined'),
(26, 1, '2025-07-16 22:09:38', 'proof_6877b2a2405c7.jpg', 'approved'),
(27, 6, '2025-07-21 00:26:28', 'proof_687d18b44bb41.jpg', 'pending'),
(28, 6, '2025-07-21 00:51:22', 'proof_687d1e8a79177.jpg', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`) VALUES
(1, 'DUST VOLUME POWER', 380.00, 'Adds volume and texture to all hair types and lengths with a natural, matte finish.'),
(2, 'SEA SALT TEXTURE SPRAY', 420.00, 'Creates a loose, lived-in look with ease. Can be used as a pre-styler for blow drying.'),
(3, 'ORIGINAL WATER-BASED POMADE', 480.00, 'Designed for timeless, classic looks such as high pompadours, side parts, and slick backs.');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT 'specific user who purchased',
  `product_id` int(11) DEFAULT NULL COMMENT 'fk to products each item has a unique id',
  `price` decimal(10,2) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `order_id`, `user_id`, `product_id`, `price`, `item`, `quantity`) VALUES
(27, 22, 1, 1, 380.00, 'DUST VOLUME POWER', 1),
(28, 22, 1, 2, 420.00, 'SEA SALT TEXTURE SPRAY', 1),
(29, 22, 1, 3, 480.00, 'ORIGINAL WATER-BASED POMADE', 1),
(30, 23, 1, 1, 380.00, 'DUST VOLUME POWER', 2),
(31, 23, 1, 2, 420.00, 'SEA SALT TEXTURE SPRAY', 2),
(32, 23, 1, 3, 480.00, 'ORIGINAL WATER-BASED POMADE', 3),
(33, 24, 1, 1, 380.00, 'DUST VOLUME POWER', 1),
(34, 24, 1, 2, 420.00, 'SEA SALT TEXTURE SPRAY', 2),
(35, 24, 1, 3, 480.00, 'ORIGINAL WATER-BASED POMADE', 3),
(36, 25, 1, 1, 380.00, 'DUST VOLUME POWER', 1),
(37, 26, 1, 1, 380.00, 'DUST VOLUME POWER', 2),
(38, 27, 6, 1, 380.00, 'DUST VOLUME POWER', 1),
(39, 28, 6, 1, 380.00, 'DUST VOLUME POWER', 1),
(40, 28, 6, 2, 420.00, 'SEA SALT TEXTURE SPRAY', 2),
(41, 28, 6, 3, 480.00, 'ORIGINAL WATER-BASED POMADE', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `role`, `created_at`) VALUES
(1, 'dummy', '$2y$10$XrwpUdZZH5dP8Lb2shFS6Ou9fcOBHM6hg2aqmHAfuqJfAuHbqxHsy', 'dummy@dummy.com', '12345', 'user', '2025-07-20 16:25:42'),
(4, 'dummy1', '$2y$10$1Ki7A6TIEzvScocf8.Kb7e.RP08Vmt0yitxDixPYdYqNdn4FuTgSO', '', '', 'user', '2025-07-20 16:25:42'),
(5, 'testuser', '$2y$10$syIakAKnSwg/3Mb6Rv.8QODZHIOspxUVC/5Z3L1a12MssBgKwalxK', 'test@example.com', '1234567890', 'user', '2025-07-20 16:25:42'),
(6, 'Martin', '$2y$10$q7kafRlCHZaWrnjtm/PFzewAN821In2KunXqc2roTGt51Lsu6yHf.', 'martin@test.com', '09123456789', 'user', '2025-07-20 16:25:42'),
(7, 'testtest', '$2y$10$tr.5o/1BCNcILYEd.XvniOxrrAN8FgO3CGXu1I4LjkX.STnNi3UHS', 'test@test.com', '09123456789', 'user', '2025-07-20 16:25:42'),
(8, 'Guest User', '', 'guest_1753029024@temporary.com', '', 'user', '2025-07-20 16:30:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_admin_user` (`user_id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_barber` (`barber_id`),
  ADD KEY `fk_user_appointment` (`user_id`);

--
-- Indexes for table `barbers`
--
ALTER TABLE `barbers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_purchase` (`user_id`),
  ADD KEY `fk_order` (`order_id`),
  ADD KEY `fk_product` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `barbers`
--
ALTER TABLE `barbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD CONSTRAINT `fk_admin_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_barber` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`id`),
  ADD CONSTRAINT `fk_user_appointment` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_user_purchase` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
