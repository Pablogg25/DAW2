<?php

// ------------------------------- TODO: require/s necesario/s
require_once __DIR__.'/../datos/vehiculoMemoriaDAO.php';
// ------------------------------- TODO: creacion del service

echo "<h1>CRUD en Memoria</h1>";

echo "<p>";
echo "Implementación activa:";
echo " MEMORIA";
echo "</p>";

echo "<h2>Alta</h2>";

/* --------------------------- TODO: Alta de vehículo1 
 * 
 
    new Vehiculo(
        1,
        "a",
        11
    );
*/

/* -------------------------- TODO: Alta de vehículo2
 * 
    new Vehiculo(
        2,
        "b",
        22
    );

*/

echo "<p>Tras insertar:</p>";

foreach (
    // ------------------------ TODO: obtener vehículos
    as $vehiculo
) {

    echo $vehiculo->id . " ";
    echo $vehiculo->nombre . " ";
    echo $vehiculo->precio . "<br>";
}

echo "<h2>Actualización</h2>";

/* 
 * -------------------------- TODO: Actualización de vehículos
    new Vehiculo(
        1,
        "aaaa",
        1111
    );
*/

echo "<p>Tras actualizar:</p>";

foreach (
    // ------------------------ TODO: obtener vehículos
    as $vehiculo
) {

    echo $vehiculo->id . " ";
    echo $vehiculo->nombre . " ";
    echo $vehiculo->precio . "<br>";
}

echo "<h2>Borrado</h2>";

/* 
 * -------------------------- TODO: Borrado de vehículo con id 2
 */


echo "<p>Tras borrar:</p>";

foreach (
    // ------------------------ TODO: obtener vehículos
    as $vehiculo
) {

    echo $vehiculo->id . " ";
    echo $vehiculo->nombre . " ";
    echo $vehiculo->precio . "<br>";
}

echo "<h2>Reemplazo (transacción)</h2>";

echo "<p>Reemplazamos 'aaaa' por 'Moto Tuneada' (25):</p>";

/* 
 * -------------------------- TODO: Reemplazo de vehículo "aaaa" por "Moto Tuneada" y precio 25
*/

echo "<p>Tras reemplazar (commit):</p>";

foreach (
    // ------------------------ TODO: obtener vehículos
    as $vehiculo
) {

    echo $vehiculo->id . " ";
    echo $vehiculo->nombre . " ";
    echo $vehiculo->precio . "<br>";
}

echo "<h2>Reemplazo fallido (rollback)</h2>";

echo "<p>Intentamos reemplazar un vehículo que no existe:</p>";

try {

    /* 
    * -------------------------- TODO: Reemplazo de vehículo inexistente :
    *       "NoExiste" por "Otro vehículo" y precio 5
    */

} catch (Exception $e) {

    echo "<p>Error: "
        . htmlspecialchars($e->getMessage())
        . "</p>";
}

echo "<p>Estado tras el rollback (sin cambios):</p>";

foreach (
    // ------------------------ TODO: obtener vehículos
    as $vehiculo
) {

    echo $vehiculo->id . " ";
    echo $vehiculo->nombre . " ";
    echo $vehiculo->precio . "<br>";
}
