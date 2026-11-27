DROP TABLE IF EXISTS vehiculos;

CREATE TABLE vehiculos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL
);

INSERT INTO vehiculos
(nombre, precio)
VALUES
('Scooter', 10.00),

('Berlina', 20.00),

('Deportivo', 30.00);
