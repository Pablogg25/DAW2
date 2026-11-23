<?php

function conectarBD(): PDO
{
    return new PDO(
        "sqlite:productos.db"
    );
}