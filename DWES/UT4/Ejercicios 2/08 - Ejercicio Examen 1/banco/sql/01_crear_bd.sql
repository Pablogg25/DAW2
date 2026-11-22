CREATE DATABASE IF NOT EXISTS dwes_practica_banco
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE dwes_practica_banco;

DROP TABLE IF EXISTS cuentas;

CREATE TABLE cuentas (
    id          INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
    iban        VARCHAR(24)   NOT NULL,
    titular     VARCHAR(100)  NOT NULL,
    saldo       DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    estado      ENUM('ACTIVA','BLOQUEADA') NOT NULL DEFAULT 'ACTIVA',
    created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_cuentas_iban UNIQUE (iban),
    CONSTRAINT chk_cuentas_saldo_no_negativo CHECK (saldo >= 0)
) ENGINE=InnoDB;