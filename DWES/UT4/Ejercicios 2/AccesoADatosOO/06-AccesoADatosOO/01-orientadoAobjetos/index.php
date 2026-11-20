<?php

require_once "config/inicializarBD.php";
require_once __DIR__ . "/src/entities/Producto.php";
require_once __DIR__ . "/src/dao/ProductoDAO.php";
require_once __DIR__ . "/src/dao/ProductoMemoriaDAO.php";
require_once __DIR__ . "/src/dao/ProductoPDODAO.php";
require_once __DIR__ . "/src/services/ProductoService.php";

// $dao = new ProductoMemoriaDAO();    // comentar esta línea y descomentar la siguiente para usar la implementación con PDO
 $dao = new ProductoPDODAO();   

$service = new ProductoService(
    $dao
);

echo "<h1>CRUD OO</h1>";

echo "<h2>Alta</h2>";
echo "<p>Dando de alta dos productos</p>";
$service->altaProducto(
    1,
    "Teclado",
    20
);

$service->altaProducto(
    2,
    "Ratón",
    10
);

echo "<p>Listado:</p>";

foreach ($service->obtenerProductos() as $producto) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}


echo "<h2>Actualización</h2>";
echo "<p>Actualizando el producto con id 1</p>";
$service->actualizarProducto(
    1,
    "Teclado Gaming",
    35
);

echo "<p>Tras actualización:</p>";

foreach ($service->obtenerProductos() as $producto) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Borrado</h2>";
echo "<p>Borrando el producto con id 2</p>";

$service->borrarProducto(2);

echo "<p>Tras borrado:</p>";

foreach ($service->obtenerProductos() as $producto) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}