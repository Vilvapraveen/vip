CREATE DATABASE IF NOT EXISTS jayas_organics;
USE jayas_organics;

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
  tagline VARCHAR(180),
  category VARCHAR(80),
  slug VARCHAR(160) UNIQUE,
  badge VARCHAR(60),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  hero_product BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  organic_certified BOOLEAN NOT NULL DEFAULT TRUE,
  description TEXT,
  benefits TEXT,
  ingredients TEXT,
  origin_region VARCHAR(120),
  unit_label VARCHAR(60),
  image_url VARCHAR(500),
  rating DECIMAL(3,2),
  review_count INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_products_name (name),
  INDEX idx_products_slug (slug),
  INDEX idx_products_active_category_featured (active, category, featured),
  INDEX idx_products_sort_created (sort_order, created_at)
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (total_price >= 0),
  order_reference VARCHAR(32) UNIQUE,
  idempotency_key VARCHAR(80) UNIQUE,
  customer_name VARCHAR(120),
  customer_email VARCHAR(150),
  customer_phone VARCHAR(30),
  shipping_address VARCHAR(500),
  delivery_city VARCHAR(100),
  delivery_state VARCHAR(100),
  delivery_pincode VARCHAR(20),
  payment_method VARCHAR(40),
  sales_channel VARCHAR(40),
  order_notes VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_orders_user_id (user_id),
  INDEX idx_orders_status_created (status, created_at),
  INDEX idx_orders_reference (order_reference)
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

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(80),
  email VARCHAR(150) NOT NULL UNIQUE,
  interest_area VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (username, password, role) VALUES
('admin', '$2a$10$CD/YEo5Zwwfwrzqy48Wpn.kahFxDagv7E35AVC3k80R3A.wA3ERX2', 'ADMIN');

INSERT INTO users (username, email, password, full_name) VALUES
('jayauser', 'jaya@example.com', '$2a$10$CD/YEo5Zwwfwrzqy48Wpn.kahFxDagv7E35AVC3k80R3A.wA3ERX2', 'Jaya Kumar'),
('madhu', 'madhu@example.com', '$2a$10$CD/YEo5Zwwfwrzqy48Wpn.kahFxDagv7E35AVC3k80R3A.wA3ERX2', 'Madhu Varma');

INSERT INTO products (name, category, price, stock_quantity, featured, description, image_url) VALUES
(
  'Moringa Wellness Powder',
  'Superfood',
  420.00,
  18,
  TRUE,
  'Nutrient-dense moringa powder for smoothies, kanji, and daily wellness routines.',
  'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80'
),
(
  'Cold-Pressed Groundnut Oil',
  'Pantry Staples',
  560.00,
  11,
  TRUE,
  'Wood-pressed groundnut oil crafted in small batches for authentic South Indian cooking.',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80'
),
(
  'Turmeric Immunity Mix',
  'Wellness',
  290.00,
  24,
  FALSE,
  'Turmeric, pepper, and palm candy blend designed for immunity drinks and golden milk.',
  'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80'
),
(
  'Traditional Idli Podi',
  'Breakfast Essentials',
  210.00,
  14,
  FALSE,
  'Roasted lentil spice mix with sesame and curry leaves for idli, dosa, and millet breakfasts.',
  'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=900&q=80'
),
(
  'Organic Sesame Laddu Mix',
  'Healthy Snacks',
  330.00,
  8,
  TRUE,
  'Jaggery and sesame mix for quick no-fuss laddus with rich calcium and iron.',
  'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80'
);

INSERT INTO orders (user_id, status, total_price, order_reference) VALUES
(1, 'PENDING', 980.00, 'VX-SEED-001'),
(2, 'PROCESSING', 620.00, 'VX-SEED-002'),
(1, 'DELIVERED', 330.00, 'VX-SEED-003');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 420.00),
(1, 2, 1, 560.00),
(2, 3, 1, 290.00),
(2, 5, 1, 330.00),
(3, 5, 1, 330.00);

INSERT INTO newsletter_subscribers (first_name, email, interest_area) VALUES
('Revathi', 'revathi@example.com', 'Immunity Rituals'),
('Karthik', 'karthik@example.com', 'Pantry Staples'),
('Meena', 'meena@example.com', 'Healthy Snacks');
