<?php

require_once __DIR__ . "/config/inicializarBD.php";

function obtenerOrigenDatos()
{
    return "SQLITE";
}

function obtenerTodos()
{
    $conexion = conectarBD();

    $consulta = $conexion->query(
        "SELECT * FROM productos"
    );

    return $consulta->fetchAll(
        PDO::FETCH_ASSOC
    );
}

function obtenerPorId($id)
{
    $conexion = conectarBD();

    $consulta = $conexion->prepare(
        "SELECT *
         FROM productos
         WHERE id = ?"
    );

    $consulta->execute([$id]);

    return $consulta->fetch(
        PDO::FETCH_ASSOC
    );
}

function insertar($nombre, $precio)
{
    $conexion = conectarBD();

    $consulta = $conexion->prepare(
        "INSERT INTO productos(nombre, precio)
         VALUES (?, ?)"
    );

    $consulta->execute([
        $nombre,
        $precio
    ]);
}

function actualizar(
    $id,
    $nombre,
    $precio
) {
    $conexion = conectarBD();

    $consulta = $conexion->prepare(
        "UPDATE productos
         SET nombre = ?,
             precio = ?
         WHERE id = ?"
    );

    $consulta->execute([
        $nombre,
        $precio,
        $id
    ]);
}

function borrar($id)
{
    $conexion = conectarBD();

    $consulta = $conexion->prepare(
        "DELETE FROM productos
         WHERE id = ?"
    );

    $consulta->execute([$id]);
}