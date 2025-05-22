SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




CREATE TABLE `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barber` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10,2),
    item VARCHAR(255),
    quantity INT
);

ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

