-- create the database
CREATE DATABASE IF NOT EXISTS wworkshop_db;
USE wworkshop_db;

-- order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- products table data
INSERT INTO products (name, description, price, images, category, types) VALUES 
(
    'DUST VOLUME POWER',
    'DUST VOLUME POWDER adds volume and texture to all hair types and lengths with a natural, matte finish.',
    380.00,
    '["./assets/shop/prod1/1.jpg", "./assets/shop/prod1/2.webp", "./assets/shop/prod1/3.webp", "./assets/shop/prod1/4.webp", "./assets/shop/prod1/5.webp"]',
    'grooming',
    NULL
),
(
    'SEA SALT TEXTURE SPRAY',
    'Create a loose, lived in look with ease or to be used as a pre-styling product when blow drying.',
    420.00,
    '["./assets/shop/prod2/1.jpg", "./assets/shop/prod2/2.webp", "./assets/shop/prod2/3.webp", "./assets/shop/prod2/4.webp", "./assets/shop/prod2/5.webp"]',
    'grooming',
    NULL
),
(
    'ORIGINAL WATER-BASED POMADE',
    'Original Water-based Pomade has been designed for the discerning guy who has a particular style in mind. Perfect for timeless, classic looks – such as high pompadours, side parts, and slick backs.',
    480.00,
    '["./assets/shop/prod3/1.jpg", "./assets/shop/prod3/2.webp", "./assets/shop/prod3/3.webp", "./assets/shop/prod3/4.webp", "./assets/shop/prod3/5.webp"]',
    'grooming',
    '["NOMAD", "FURY", "REVOLT"]'
);
