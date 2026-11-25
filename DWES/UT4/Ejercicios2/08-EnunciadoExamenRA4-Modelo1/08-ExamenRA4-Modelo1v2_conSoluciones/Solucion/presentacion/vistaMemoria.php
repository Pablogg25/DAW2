<?php

require_once __DIR__
    . "/../config/factoriaAplicacion.php";

require_once __DIR__
    . "/../entidades/Producto.php";

$factoria =
    new FactoriaAplicacion();

$service =
    $factoria->crearProductoService();

echo "<h1>CRUD en Memoria</h1>";

echo "<p>";
echo "Implementación activa:";
echo " MEMORIA";
echo "</p>";

echo "<h2>Alta</h2>";

$service->altaProducto(
    new Producto(
        1,
        "a",
        11
    )
);

$service->altaProducto(
    new Producto(
        2,
        "b",
        22
    )
);

echo "<p>Tras insertar:</p>";

foreach (
    $service->obtenerProductos()
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Actualización</h2>";

$service->actualizarProducto(

    new Producto(
        1,
        "aaaa",
        1111
    )

);

echo "<p>Tras actualizar:</p>";

foreach (
    $service->obtenerProductos()
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Borrado</h2>";

$service->borrarProducto(
    2
);

echo "<p>Tras borrar:</p>";

foreach (
    $service->obtenerProductos()
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Reemplazo (transacción)</h2>";

echo "<p>Reemplazamos 'aaaa' por 'Ratón Gaming' (25):</p>";

$service->reemplazarProducto(
    "aaaa",
    "Ratón Gaming",
    25
);

echo "<p>Tras reemplazar (commit):</p>";

foreach (
    $service->obtenerProductos()
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Reemplazo fallido (rollback)</h2>";

echo "<p>Intentamos reemplazar un producto que no existe:</p>";

try {

    $service->reemplazarProducto(
        "NoExiste",
        "Otro producto",
        5
    );

} catch (Exception $e) {

    echo "<p>Error: "
        . htmlspecialchars($e->getMessage())
        . "</p>";
}

echo "<p>Estado tras el rollback (sin cambios):</p>";

foreach (
    $service->obtenerProductos()
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}
