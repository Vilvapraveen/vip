CREATE DATABASE IF NOT EXISTS admin_panel;
USE admin_panel;

CREATE TABLE IF NOT EXISTS admins (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'ADMIN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_products_name (name)
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (total_price >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_orders_user_id (user_id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_order_items_order_id (order_id),
  INDEX idx_order_items_product_id (product_id)
);

INSERT INTO admins (username, password, role) VALUES
('admin', '$2a$10$e0MYzXyjpJS7Pd0RVvHwHeFxmhwxf1r9c5rQ5OquLQZqfYx2vG9cW', 'ADMIN');

INSERT INTO users (username, email, password, full_name) VALUES
('jayauser', 'jaya@example.com', '$2a$10$e0MYzXyjpJS7Pd0RVvHwHeFxmhwxf1r9c5rQ5OquLQZqfYx2vG9cW', 'Jaya Kumar'),
('madhu', 'madhu@example.com', '$2a$10$e0MYzXyjpJS7Pd0RVvHwHeFxmhwxf1r9c5rQ5OquLQZqfYx2vG9cW', 'Madhu Varma');

INSERT INTO products (name, price, description, image_url) VALUES
('Pirandai Thokku', 350.00, 'Traditional Tamil side dish for rice.', 'https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg'),
('Idli Podi', 200.00, 'Aromatic spice podi for idli and dosa.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdl5necT5OCNgYCMAfuzjwmtI5MfKUtF0zaA&s'),
('Ellu Podi', 250.00, 'Sesame powder great with rice.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFZnu6TJZ_7ATeuZGji5sN2p0lnjRERuryA&s');

INSERT INTO orders (user_id, status, total_price) VALUES
(1, 'PENDING', 550.00),
(2, 'SHIPPED', 250.00);

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 350.00),
(1, 2, 1, 200.00),
(2, 3, 1, 250.00);
