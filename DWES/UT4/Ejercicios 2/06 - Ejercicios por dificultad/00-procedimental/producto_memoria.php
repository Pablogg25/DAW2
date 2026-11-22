<?php

$productos = [
    [
        "id" => 1,
        "nombre" => "PRODUCTO MEMORIA",
        "precio" => 999
    ]
];

$ultimoId = 1;

function obtenerOrigenDatos()
{
    return "MEMORIA";
}

function obtenerTodos()
{
    global $productos;

    return $productos;
}

function obtenerPorId($id)
{
    global $productos;

    foreach ($productos as $producto) {

        if ($producto["id"] == $id) {
            return $producto;
        }

    }

    return null;
}

function insertar($nombre, $precio)
{
    global $productos;
    global $ultimoId;

    $ultimoId++;

    $productos[] = [
        "id" => $ultimoId,
        "nombre" => $nombre,
        "precio" => $precio
    ];
}

function actualizar(
    $id,
    $nombre,
    $precio
) {
    global $productos;

    foreach ($productos as &$producto) {

        if ($producto["id"] == $id) {

            $producto["nombre"] = $nombre;
            $producto["precio"] = $precio;
        }

    }
}

function borrar($id)
{
    global $productos;

    $productos = array_filter(
        $productos,
        fn($p) => $p["id"] != $id
    );
}