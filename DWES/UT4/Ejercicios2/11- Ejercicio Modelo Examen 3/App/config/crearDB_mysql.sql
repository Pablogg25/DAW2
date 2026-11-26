CREATE DATABASE IF NOT EXISTS dwes_componentes
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE dwes_componentes;

DROP TABLE IF EXISTS componentes;

CREATE TABLE componentes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO componentes (nombre, precio) VALUES
('Ryzen 5 5600X', 145.00),
('GTX 1660 Super', 210.00),
('SSD NVMe 1TB', 68.50);