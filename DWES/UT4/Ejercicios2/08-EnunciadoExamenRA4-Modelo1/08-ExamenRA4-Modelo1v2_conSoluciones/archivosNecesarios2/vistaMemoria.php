<?php

// ------------------------------- TODO: require/s necesario/s

// ------------------------------- TODO: creacion del service

echo "<h1>CRUD en Memoria</h1>";

echo "<p>";
echo "Implementación activa:";
echo " MEMORIA";
echo "</p>";

echo "<h2>Alta</h2>";

/* --------------------------- TODO: Alta de producto1 
 * 
    new Producto(
        1,
        "a",
        11
    );
*/

/* -------------------------- TODO: Alta de producto2
 * 
    new Producto(
        2,
        "b",
        22
    );

*/

echo "<p>Tras insertar:</p>";

foreach (
    // ------------------------ TODO: obtener productos
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Actualización</h2>";

/* 
 * -------------------------- TODO: Actualización de productos
    new Producto(
        1,
        "aaaa",
        1111
    );
*/

echo "<p>Tras actualizar:</p>";

foreach (
    // ------------------------ TODO: obtener productos
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Borrado</h2>";

/* 
 * -------------------------- TODO: Borrado de producto con id 2
 */


echo "<p>Tras borrar:</p>";

foreach (
    // ------------------------ TODO: obtener productos
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Reemplazo (transacción)</h2>";

echo "<p>Reemplazamos 'aaaa' por 'Ratón Gaming' (25):</p>";

/* 
 * -------------------------- TODO: Reemplazo de producto "aaaa" por "Ratón Gaming" y precio 25
*/

echo "<p>Tras reemplazar (commit):</p>";

foreach (
    // ------------------------ TODO: obtener productos
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}

echo "<h2>Reemplazo fallido (rollback)</h2>";

echo "<p>Intentamos reemplazar un producto que no existe:</p>";

try {

    /* 
    * -------------------------- TODO: Reemplazo de producto inexistente :
    *       "NoExiste" por "Otro producto" y precio 5
    */

} catch (Exception $e) {

    echo "<p>Error: "
        . htmlspecialchars($e->getMessage())
        . "</p>";
}

echo "<p>Estado tras el rollback (sin cambios):</p>";

foreach (
    // ------------------------ TODO: obtener productos
    as $producto
) {

    echo $producto->id . " ";
    echo $producto->nombre . " ";
    echo $producto->precio . "<br>";
}
