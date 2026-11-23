CREATE DATABASE IF NOT EXISTS dwes_examen2_ut04
CHARACTER SET utf8mb4;

USE dwes_examen2_ut04;

DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS peliculas;

CREATE TABLE peliculas (

    id INT UNSIGNED
    AUTO_INCREMENT
    PRIMARY KEY,

    titulo VARCHAR(255)
    NOT NULL,

    precio DECIMAL(8,2)
    NOT NULL,

    entradas_disponibles INT UNSIGNED
    NOT NULL,

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE ventas (

    id INT UNSIGNED
    AUTO_INCREMENT
    PRIMARY KEY,

    pelicula_id INT UNSIGNED
    NOT NULL,

    comprador VARCHAR(255)
    NOT NULL,

    cantidad INT UNSIGNED
    NOT NULL,

    total DECIMAL(10,2)
    NOT NULL,

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ventas_pelicula

    FOREIGN KEY (pelicula_id)

    REFERENCES peliculas(id)

    ON DELETE CASCADE

);