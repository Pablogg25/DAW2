<?php

require_once __DIR__ . "/src/dao/ProductoPDODAO.php";
require_once __DIR__ . "/src/services/ProductoService.php";

$dao = new ProductoPDODAO();

$service = new ProductoService($dao);

/*****************
 * INSERT
 *****************/
if (isset($_POST["insertar"])) {

    $service->altaProducto(
        0,
        $_POST["nombre"],
        (float) $_POST["precio"]
    );

    // Redirigir a la misma página para evitar el reenvío del formulario al pulsar F5
    header("Location: index.php");
    exit();
}

/*****************
 * UPDATE
 *****************/
if (isset($_POST["actualizar"])) {

    $service->actualizarProducto(
        (int) $_POST["id"],
        $_POST["nombre"],
        (float) $_POST["precio"]
    );

    // Redirigir a la misma página para evitar el reenvío del formulario al pulsar F5
    header("Location: index.php");
    exit();
}

/*****************
 * DELETE
 *****************/
if (isset($_POST["borrar"])) {

    $service->borrarProducto(
        (int) $_POST["id"]
    );

    // Redirigir a la misma página para evitar el reenvío del formulario al pulsar F5
    header("Location: index.php");
    exit();
}
    


/*****************
 * READ
 *****************/
$productos = $service->obtenerProductos();

/*****************
 * VISTA
 *****************/
require __DIR__ . "/presentacion/vista.php";