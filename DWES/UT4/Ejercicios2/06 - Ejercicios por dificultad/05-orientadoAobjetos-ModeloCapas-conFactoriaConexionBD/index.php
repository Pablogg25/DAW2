<?php

require_once __DIR__ . "/config/Factoria.php";
require_once __DIR__ . "/entidades/Producto.php";

$factoria = new Factoria();
$service = $factoria->crearProductoService();

/*****************
 * INSERT
 *****************/
if (isset($_POST["insertar"])) {

    $producto = new Producto(
        0,
        $_POST["nombre"],
        (float) $_POST["precio"]
    );

    $service->altaProducto(
        $producto
    );

    header("Location: index.php");
    exit();
}

/*****************
 * UPDATE
 *****************/
if (isset($_POST["actualizar"])) {

    $producto = new Producto(
        (int) $_POST["id"],
        $_POST["nombre"],
        (float) $_POST["precio"]
    );

    $service->actualizarProducto(
        $producto
    );

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

    header("Location: index.php");
    exit();
}

/*****************
 * READ
 *****************/
$productos = $service->obtenerProductos();

require __DIR__ . "/presentacion/vista.php";