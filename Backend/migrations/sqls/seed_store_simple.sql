-- Seed script for store database (RDS-compatible, no trigger manipulation)
BEGIN;

-- Delete in correct order to respect foreign key constraints
DELETE FROM products_orders;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM users;

-- Reset sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;

-- Insert 20 users
INSERT INTO users (firstName, lastName, password) VALUES
('Alice','Anderson','pwd1'),
('Bob','Bennett','pwd2'),
('Carol','Clark','pwd3'),
('David','Dawson','pwd4'),
('Eve','Edwards','pwd5'),
('Frank','Foster','pwd6'),
('Grace','Green','pwd7'),
('Heidi','Hughes','pwd8'),
('Ivan','Iverson','pwd9'),
('Judy','Jones','pwd10'),
('Karl','King','pwd11'),
('Laura','Lewis','pwd12'),
('Mallory','Mason','pwd13'),
('Niaj','Nelson','pwd14'),
('Olivia','Owens','pwd15'),
('Peggy','Peters','pwd16'),
('Quinn','Quincy','pwd17'),
('Rupert','Reed','pwd18'),
('Sybil','Scott','pwd19'),
('Trent','Turner','pwd20');

-- Insert 20 products
INSERT INTO products (name, price, category) VALUES
('Widget A', 9.99, 'gadgets'),
('Widget B', 14.99, 'gadgets'),
('Gizmo A', 19.99, 'gadgets'),
('Gizmo B', 24.99, 'gadgets'),
('Thingamajig A', 4.99, 'tools'),
('Thingamajig B', 7.99, 'tools'),
('Doohickey A', 29.99, 'tools'),
('Doohickey B', 39.99, 'tools'),
('Contraption A', 49.99, 'home'),
('Contraption B', 59.99, 'home'),
('Gadget Pro', 199.99, 'electronics'),
('Gadget Mini', 89.99, 'electronics'),
('Device X', 129.99, 'electronics'),
('Device Y', 149.99, 'electronics'),
('Accessory 1', 5.99, 'accessories'),
('Accessory 2', 6.99, 'accessories'),
('Accessory 3', 3.99, 'accessories'),
('Accessory 4', 2.99, 'accessories'),
('Novelty 1', 1.99, 'novelty'),
('Novelty 2', 2.49, 'novelty');

-- Insert orders
INSERT INTO orders (status, user_id) VALUES
(true, 1),(true, 2),(true, 3),(true, 4),(true, 5),(true, 6),
(false, 1), (false, 1), (false, 1), (false, 1), (false, 1),
(false, 2), (false, 2), (false, 2), (false, 2),
(false, 3), (false, 3), (false, 3),
(false, 4), (false, 4),
(false, 5),
(false, 7), (false, 7), (false, 7), (false, 7), (false, 7),
(false, 8), (false, 8), (false, 8), (false, 8),
(false, 9), (false, 9), (false, 9),
(false, 10), (false, 10),
(false, 11);

-- Insert products_orders
INSERT INTO products_orders (product_id, order_id, quantity) VALUES
(1,1,2),(1,2,1),(1,3,3),(1,4,1),(1,5,2),(1,6,1),(1,7,1),(1,8,2),(1,9,1),(1,10,1),
(1,11,2),(1,12,1),(1,13,1),(1,14,2),(1,15,1),(1,16,1),(1,17,2),(1,18,1),(1,19,1),(1,20,2),
(1,21,1),(1,22,2),
(2,1,1),(2,2,2),(2,3,1),(2,4,2),(2,5,1),(2,6,2),(2,7,1),(2,8,1),(2,9,2),(2,10,1),
(2,11,1),(2,12,2),(2,13,1),(2,14,1),(2,15,2),(2,16,1),(2,23,2),(2,24,1),
(3,1,1),(3,2,1),(3,5,2),(3,6,1),(3,11,1),(3,13,2),(3,15,1),(3,17,1),(3,22,1),(3,23,2),
(3,25,1),(3,26,1),(3,27,2),(3,28,1),
(4,3,2),(4,7,1),(4,12,1),(4,14,2),(4,16,1),(4,18,1),(4,24,2),(4,25,1),(4,29,1),(4,30,2),
(4,31,1),
(5,4,1),(5,8,2),(5,13,1),(5,19,1),(5,20,2),(5,26,1),(5,32,2),(5,33,1),(5,34,1),
(6,9,1),(6,14,2),(6,19,1),(6,27,1),(6,35,2),(6,21,1),(6,22,2),
(7,10,1),(7,15,1),(7,20,2),(7,28,1),(7,36,2),(7,23,1),
(8,11,1),(8,16,2),(8,29,1),(8,30,2),(8,24,1),
(9,12,1),(9,17,1),(9,31,2),(9,32,1),(9,25,2),
(10,13,2),(10,18,1),(10,33,1),(10,34,2),(10,26,1),
(11,1,1),(11,27,2),(11,35,1),
(12,2,1),(12,28,1),(12,36,2),
(13,3,2),(13,29,1),
(14,4,1),(14,30,2),
(15,5,1),(15,31,1),
(16,6,2),(16,32,1),
(17,7,1),(17,33,2),
(18,8,1),(18,34,1),
(19,9,2),(19,35,1),
(20,10,1),(20,36,2);

COMMIT;
