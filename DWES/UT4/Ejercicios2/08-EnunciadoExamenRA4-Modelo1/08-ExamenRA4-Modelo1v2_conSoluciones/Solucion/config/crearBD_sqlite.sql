DROP TABLE IF EXISTS productos;

DROP TABLE IF EXISTS productos;
CREATE TABLE productos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL
);

INSERT INTO productos
(nombre, precio)
VALUES
('Producto A', 10.00),

('Producto B', 20.00),

('Producto C', 30.00);