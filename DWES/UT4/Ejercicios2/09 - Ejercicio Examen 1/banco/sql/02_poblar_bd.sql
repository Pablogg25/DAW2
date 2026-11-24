USE dwes_practica_banco;

TRUNCATE TABLE cuentas;

INSERT INTO cuentas (iban, titular, saldo, estado) VALUES
('ES1000000000000000000001', 'Lucía Fernández', 2500.00,  'ACTIVA'),
('ES1000000000000000000002', 'Marcos Ortiz',     150.75,  'ACTIVA'),
('ES1000000000000000000003', 'Elena Navarro',      0.00,  'ACTIVA'),
('ES1000000000000000000004', 'Pablo Ruiz',       980.00,  'BLOQUEADA'),
('ES1000000000000000000005', 'Sara Molina',    12000.50,  'ACTIVA'),
('ES1000000000000000000006', 'Javier Prieto',     45.20,  'ACTIVA');