<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');

// ------------------------------------ TODO: require/s necesario/s

require_once __DIR__ . '/../proyecto/config/FactoriaAplicacion.php';
// ------------------------------------ TODO: crear el service

$servicio = FactoriaAplicacion::crearServicio();

/*
 * INSERT
 */
if (isset($_POST['insertar'])) {
    $vehiculo = new Vehiculo(
        0,
        $_POST['nombre'],
        (float) $_POST['precio']
    );

    // ------------------------------- TODO: Alta de vehículo
    $servicio->save($vehiculo);
    header('Location: index.php');
    exit();
}

/*
 * UPDATE
 */
if (isset($_POST['actualizar'])) {
    $vehiculo = new Vehiculo(
        (int) $_POST['id'],
        $_POST['nombre'],
        (float) $_POST['precio']
    );

    // ---------------------------- TODO: Actualización de vehículo
    // LOS LOGS FUNCIONAN PERO SE QUEDA EN BUCLE Y NO LLEGA A EJECUTAR
    $servicio->update($_POST['id'], $vehiculo);
    header('Location: index.php');
    exit();
}

/*
 * DELETE
 */
if (isset($_POST['borrar'])) {
    // ------------------------------------ TODO: Borrado de vehículo
    // LOS LOGS FUNCIONAN PERO SE QUEDA EN BUCLE Y NO LLEGA A EJECUTAR
    $servicio->delete((int) $_POST['id']);
    header('Location: index.php');
    exit();
}

/*
 * TRANSACCION (reemplazar vehículo: borrar + insertar)
 *
 * Los datos están fijados en el código (hardcodeados):
 *   sustituye el vehículo "Moto" por "Moto Tuneada" (25 k$).
 *
 * PRECONDICIÓN antes de pulsar el botón:
 *   debe existir en la base de datos un vehículo cuyo nombre sea
 *   exactamente "Moto".
 *
 * Si NO se cumple (por ejemplo, porque ya se ejecutó una vez y el
 * vehículo "Moto" ya no existe), la capa de datos lanza una
 * excepción, hace ROLLBACK (no se modifica nada) y aquí se captura
 * para que la página no se rompa: se recarga la lista sin cambios.
 */
if (isset($_POST['transaccion'])) {
    try {
        $servicio->reemplazarVehiculo('Moto', 'Moto Tuneada', 25000);
    } catch (Throwable $e) {
        // Precondición no cumplida o fallo en la transacción:
        // ya se ha hecho rollback, no hay nada más que deshacer.
        throw new Exception($e->getMessage());
    }

    header('Location: index.php');
    exit();
}

/*
 * READ
 */
$vehiculos = $servicio->listAll();
// ---------------------------------- TODO:Obtener vehículos

// ---------------------------------- TODO: require de la vista
require __DIR__ . '/../proyecto/presentacion/vista.php';
