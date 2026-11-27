<?php

// requires
// require_once __DIR__ . '/../App/datos/ConexionBD.php';
require_once __DIR__ . '/../App/config/FactoriaAplicacion.php';
// crear el service
$servicio = FactoriaAplicacion::crearServicioFactoria();
$error = null;
$mensaje = null;

if (isset($_GET['sustituida'])) {
    $mensaje = 'Motocicleta sustituida correctamente.';
}

/*
 * - INSERT
 */
if (isset($_POST['insertar'])) {
    $moto = new Moto(
        0,
        $_POST['nombre'],
        (float) $_POST['precio']
    );

    // Alta de motocicleta
    $servicio->save($moto);
    header('Location: index.php');
    exit();
}

/*
 * - UPDATE
 */
if (isset($_POST['actualizar'])) {
    $moto = new Moto(
        (int) $_POST['id'],
        $_POST['nombre'],
        (float) $_POST['precio']
    );

    // Actualización de motocicleta
    $servicio->update((int) $_POST['id'], $moto);
    header('Location: index.php');
    exit();
}

/*
 * - DELETE
 */
if (isset($_POST['borrar'])) {
    // Borrado de motocicleta
    $servicio->delete((int) $_POST['id']);
    header('Location: index.php');
    exit();
}

/*
 * - SUSTITUIR (borrar + insertar en una transacción)
 */
if (isset($_POST['sustituir'])) {
    try {
        /*
         * - "Sustituir moto"(
         * -     $_POST["modeloAntiguo"],
         * -     $_POST["modeloNuevo"],
         * -     (float) $_POST["precio"]
         * - );
         */
        header('Location: index.php?sustituida=1');
        exit();
    } catch (Throwable $e) {
        // Se ha hecho rollback: los datos siguen como antes.
        // No redirigimos para poder mostrar el motivo del error.
        $error = 'No se pudo sustituir la motocicleta '
            . '(se deshicieron los cambios): '
            . $e->getMessage();
    }
}

/*
 * - READ
 */
$motos = $servicio->listAll();

// Obtener motocicletas ($motos)

if (defined('TIPO_DAO') && TIPO_DAO === 'MEMORIA') {
    require __DIR__ . '/presentacion/vistaMemoria.php';
} else {
    require __DIR__ . '/presentacion/vista.php';
}
