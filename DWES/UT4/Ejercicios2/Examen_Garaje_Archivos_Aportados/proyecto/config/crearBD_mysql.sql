DROP DATABASE IF EXISTS garaje;
CREATE DATABASE IF NOT EXISTS garaje
CHARACTER SET utf8mb4;

USE garaje;

DROP TABLE IF EXISTS vehiculos;

CREATE TABLE vehiculos(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO vehiculos
(nombre, precio)
VALUES
('Scooter', 10.00),

('Berlina', 20.00),

('Deportivo', 30.00);
