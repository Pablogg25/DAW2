DROP DATABASE IF EXISTS laboratorio;
CREATE DATABASE IF NOT EXISTS laboratorio
CHARACTER SET utf8mb4;

USE laboratorio;

DROP TABLE IF EXISTS productos;

DROP TABLE IF EXISTS productos;
CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO productos
(nombre, precio)
VALUES
('Producto A', 10.00),

('Producto B', 20.00),

('Producto C', 30.00);