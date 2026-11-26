DROP TABLE IF EXISTS componentes;

CREATE TABLE componentes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL
);

INSERT INTO componentes (nombre, precio) VALUES
('Ryzen 5 5600X', 145.00),
('GTX 1660 Super', 210.00),
('SSD NVMe 1TB', 68.50);