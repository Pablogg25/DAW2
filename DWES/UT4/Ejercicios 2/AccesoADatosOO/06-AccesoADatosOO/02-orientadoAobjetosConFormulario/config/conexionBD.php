<?php

function conectarBD(): PDO
{
    return new PDO(
          "sqlite:" . __DIR__ . "/../productos.db"
    );
}
