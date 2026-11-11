<?php
function obtenerConexion():PDO{
    return new PDO("mysql:host=localhost:3306;dbname=veterinaria;charset=utf8", "root", "r00tMy\$ql");
}