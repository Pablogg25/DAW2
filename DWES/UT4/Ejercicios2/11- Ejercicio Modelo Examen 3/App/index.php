<?php

// requires

// crear el service

$error = null;
$mensaje = null;

if (isset($_GET['sustituido'])) {
    $mensaje = 'Componente sustituido correctamente.';
}

/*
 * INSERT
 */
if (isset($_POST['insertar'])) {
    $componente = new Componente(0, $_POST['nombre'],
        (float) $_POST['precio']);

    // Alta de componente

    header('Location: index.php');
    exit();
}

/*
 * UPDATE
 */
if (isset($_POST['actualizar'])) {
    $componente = new Componente(
        (int) $_POST['id'], $_POST['nombre'],
        (float) $_POST['precio']
    );

    // Actualización de componente

    header('Location: index.php');
    exit();
}

/*
 * DELETE
 */
if (isset($_POST['borrar'])) {
    // Borrado de componente

    header('Location: index.php');
    exit();
}

/*
 * SUSTITUIR (borrar + insertar en una transacción)
 */
if (isset($_POST['sustituir'])) {
    try {
        /*
         * Llamada al servicio para sustituir componente:
         * $_POST['nombreAntiguo'], $_POST['nombreNuevo'], (float)$_POST['precio']
         */
        header('Location: index.php?sustituido=1');
        exit();
    } catch (Throwable $e) {
        // Se ha hecho rollback: los datos siguen como antes.
        // No redirigimos para poder mostrar el motivo del error.
        $error = 'No se pudo sustituir el componente '
            . '(se deshicieron los cambios): '
            . $e->getMessage();
    }
}

/*
 * READ
 */

// Obtener componentes ($componentes)

if (defined('TIPO_DAO') && TIPO_DAO === 'MEMORIA') {
    require __DIR__ . '/presentacion/vistaMemoria.php';
} else {
    require __DIR__ . '/presentacion/vista.php';
}
