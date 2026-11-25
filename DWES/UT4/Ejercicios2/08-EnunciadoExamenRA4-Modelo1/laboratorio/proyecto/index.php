<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// requires

require_once __DIR__ . '/config/FactoriaAplicacion.php';
require_once __DIR__ . '/entidades/Producto.php';
require_once __DIR__ . '/config/configuracion.php';

// crear el service
/*if ($tipoDAO === 'MEMORIA') {
    require __DIR__
        . '/presentacion/vistaMemoria.php';

    exit();
}*/

$factoria = new FactoriaAplicacion();
$service = $factoria->getService();

$error = null;
$mensaje = null;

if (isset($_GET['reemplazado'])) {
    $mensaje = 'Producto reemplazado correctamente.';
}

/*
 * INSERT
 */
if (isset($_POST['insertar'])) {
    $producto = new Producto(
        0,
        $_POST['nombre'],
        (float) $_POST['precio']
    );

    // Alta de producto
    $service->save($producto);
    header('Location: index.php');
    exit();
}

/*
 * UPDATE
 */
if (isset($_POST['actualizar'])) {
    $producto = new Producto(
        (int) $_POST['id'],
        $_POST['nombre'],
        (float) $_POST['precio']
    );

    // Actualización de producto
    $service->update($producto->getId(), $producto);
    header('Location: index.php');
    exit();
}

/*
 * DELETE
 */
if (isset($_POST['borrar'])) {
    // Borrado de producto
    $service->delete((int) $_POST['id']);
    header('Location: index.php');
    exit();
}

/*
 * REEMPLAZAR (borrar + insertar en una transacción)
 */
if (isset($_POST['reemplazar'])) {
    try {
        /*
         * "Reemplazar producto"(
         *     $_POST["nombreAntiguo"],
         *     $_POST["nombreNuevo"],
         *     (float) $_POST["precio"]
         * );
         */
        header('Location: index.php?reemplazado=1');
        exit();
    } catch (Throwable $e) {
        // Se ha hecho rollback: los datos siguen como antes.
        // No redirigimos para poder mostrar el motivo del error.
        $error = 'No se pudo reemplazar el producto '
            . '(se deshicieron los cambios): '
            . $e->getMessage();
    }
}

/*
 * READ
 */
$productos = $service->listAll();
// Obtener productos

require __DIR__ . '/presentacion/vista.php';
