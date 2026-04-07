INSERT INTO admins (id, username, password, role, created_at) VALUES
    (1, 'admin', '$2a$10$CD/YEo5Zwwfwrzqy48Wpn.kahFxDagv7E35AVC3k80R3A.wA3ERX2', 'ADMIN', CURRENT_TIMESTAMP);

INSERT INTO users (id, username, email, password, full_name, created_at) VALUES
    (1, 'jayauser', 'jaya@example.com', '$2a$10$CD/YEo5Zwwfwrzqy48Wpn.kahFxDagv7E35AVC3k80R3A.wA3ERX2', 'Jaya Kumar', CURRENT_TIMESTAMP),
    (2, 'madhu', 'madhu@example.com', '$2a$10$CD/YEo5Zwwfwrzqy48Wpn.kahFxDagv7E35AVC3k80R3A.wA3ERX2', 'Madhu Varma', CURRENT_TIMESTAMP);

INSERT INTO products (id, name, category, price, stock_quantity, featured, description, image_url, created_at) VALUES
    (1, 'Moringa Wellness Powder', 'Superfood', 420.00, 18, TRUE, 'Nutrient-dense moringa powder for smoothies, kanji, and daily wellness routines.', 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80', CURRENT_TIMESTAMP),
    (2, 'Cold-Pressed Groundnut Oil', 'Pantry Staples', 560.00, 9, TRUE, 'Wood-pressed groundnut oil crafted in small batches for authentic South Indian cooking.', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80', CURRENT_TIMESTAMP),
    (3, 'Turmeric Immunity Mix', 'Wellness', 290.00, 24, FALSE, 'Turmeric, pepper, and palm candy blend designed for immunity drinks and golden milk.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80', CURRENT_TIMESTAMP),
    (4, 'Traditional Idli Podi', 'Breakfast Essentials', 210.00, 14, FALSE, 'Roasted lentil spice mix with sesame and curry leaves for idli, dosa, and millet breakfasts.', 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=900&q=80', CURRENT_TIMESTAMP),
    (5, 'Organic Sesame Laddu Mix', 'Healthy Snacks', 330.00, 6, TRUE, 'Jaggery and sesame mix for quick no-fuss laddus with rich calcium and iron.', 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80', CURRENT_TIMESTAMP);

INSERT INTO orders (id, user_id, status, total_price, created_at) VALUES
    (1, 1, 'PENDING', 980.00, CURRENT_TIMESTAMP),
    (2, 2, 'PROCESSING', 620.00, CURRENT_TIMESTAMP),
    (3, 1, 'DELIVERED', 330.00, CURRENT_TIMESTAMP);

INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES
    (1, 1, 1, 1, 420.00),
    (2, 1, 2, 1, 560.00),
    (3, 2, 3, 1, 290.00),
    (4, 2, 5, 1, 330.00),
    (5, 3, 5, 1, 330.00);
