<?php

// requires

// crear el service

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

    header('Location: index.php');
    exit();
}

/*
 * DELETE
 */
if (isset($_POST['borrar'])) {
    // Borrado de producto

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

// Obtener productos

require __DIR__ . '/presentacion/vista.php';
