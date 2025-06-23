
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
)

INSERT INTO `admin_users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2y$10$6CCj1MoZNDyIela/D/zxC.NjYyefDPQjt4Vnt3h8o8HbIVPRVtrpi');

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `barber` varchar(100) NOT NULL,
  `service` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
)

INSERT INTO `appointments` (`id`, `barber`, `service`, `date`, `time`) VALUES
(10, 'Gylliane', 'Shave', '2025-05-03', '14:51:00'),
(11, 'Dorothy', '', '2025-05-17', '14:51:00');

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `purchases` (`id`, `price`, `item`, `quantity`) VALUES
(6, 380.00, 'DUST VOLUME POWER', 2),
(7, 420.00, 'SEA SALT TEXTURE SPRAY', 1),
(8, 480.00, 'ORIGINAL WATER-BASED POMADE - REVOLT', 1);

ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

