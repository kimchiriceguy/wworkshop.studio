-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2025 at 06:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin_users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2y$10$6CCj1MoZNDyIela/D/zxC.NjYyefDPQjt4Vnt3h8o8HbIVPRVtrpi');

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `barber_id` int(11) NOT NULL,
  `service` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `barbers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `portfolio` JSON DEFAULT NULL,
  `availability` JSON DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `barbers` (`id`, `name`, `portfolio`, `availability`, `status`) VALUES
(1, 'Martin', '["Haircut", "Beard Trim", "Shave"]', '{"workDays": ["Mon","Tue","Wed","Thu","Fri","Sat"], "workHours": "11:00-20:00"}', 'active'),
(2, 'Dorothy', '["Haircut", "Beard Trim", "Shave"]', '{"workDays": ["Mon","Tue","Wed","Thu","Fri","Sat"], "workHours": "11:00-20:00"}', 'active'),
(3, 'Asterio', '["Haircut", "Beard Trim", "Shave"]', '{"workDays": ["Mon","Tue","Wed","Thu","Fri","Sat"], "workHours": "11:00-20:00"}', 'active'),
(4, 'Gylliane', '["Haircut", "Beard Trim", "Shave"]', '{"workDays": ["Mon","Tue","Wed","Thu","Fri","Sat"], "workHours": "11:00-20:00"}', 'active');

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` enum('admin','regular_user') DEFAULT 'regular_user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_barber` (`barber_id`),
  ADD KEY `fk_user_appointment` (`user_id`);

ALTER TABLE `barbers`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`);

ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_purchase` (`user_id`),
  ADD KEY `fk_order` (`order_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `barbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_barber` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`id`),
  ADD CONSTRAINT `fk_user_appointment` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `purchases`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `fk_user_purchase` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

DELETE FROM barbers WHERE id = 0;
ALTER TABLE `barbers` AUTO_INCREMENT = 1;

-- this should return all appointments that do not have a corresponding user in the users table (?)

