<?php

require_once __DIR__ . "/producto_dal.php";

echo "<h2>Implementación DAL activa: ";
echo obtenerOrigenDatos();
echo "</h2>";

echo "<h1>CRUD Procedimental</h1>";

insertar(
    "Teclado",
    20
);

insertar(
    "Ratón",
    10
);

echo "<h2>Listado</h2>";

foreach (obtenerTodos() as $producto) {

    echo $producto["id"] . " ";
    echo $producto["nombre"] . " ";
    echo $producto["precio"] . "<br>";
}

actualizar(
    1,
    "Teclado Gaming",
    35
);

echo "<h2>Tras actualización</h2>";

foreach (obtenerTodos() as $producto) {

    echo $producto["id"] . " ";
    echo $producto["nombre"] . " ";
    echo $producto["precio"] . "<br>";
}

borrar(2);

echo "<h2>Tras borrado</h2>";

foreach (obtenerTodos() as $producto) {

    echo $producto["id"] . " ";
    echo $producto["nombre"] . " ";
    echo $producto["precio"] . "<br>";
}