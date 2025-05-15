-- Create the database
CREATE DATABASE IF NOT EXISTS wworkshop_db;
USE wworkshop_db;

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_path VARCHAR(255),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product types table for variants (e.g., sizes)
CREATE TABLE product_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    type_name VARCHAR(50),
    price_modifier DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    total_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    product_type VARCHAR(50),
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample product data
INSERT INTO products (name, description, price, image_path, category) VALUES
('DUST VOLUME POWDER', 'DUST VOLUME POWDER adds volume and texture to all hair types and lengths with a natural, matte finish.', 299.99, './assets/shop/prod1/1.jpg', 'grooming'),
('Product 2', 'Description for product 2', 199.99, './assets/shop/prod2/1.jpg', 'grooming'),
('Product 3', 'Description for product 3', 399.99, './assets/shop/prod3/1.jpg', 'grooming');
