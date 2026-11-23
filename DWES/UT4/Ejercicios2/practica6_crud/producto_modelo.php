<?php

// READ: Obtener todos los productos (sin parámetros externos se usa query)
function obtenerProductos(PDO $conexion): array
{
    $consulta = $conexion->query(
        'SELECT id, nombre, precio, unidades FROM productos ORDER BY id DESC'
    );
    return $consulta->fetchAll();
}

// READ: Obtener un único producto por su ID
function obtenerProductoPorId(PDO $conexion, int $id): array|false
{
    $consulta = $conexion->prepare(
        'SELECT id, nombre, precio, unidades FROM productos WHERE id = :id'
    );
    $consulta->execute([':id' => $id]);
    return $consulta->fetch();
}

// CREATE: Insertar un nuevo producto
function insertarProducto(PDO $conexion, string $nombre, float $precio, int $unidades): bool
{
    $sql = 'INSERT INTO productos (nombre, precio, unidades) VALUES (:nombre, :precio, :unidades)';
    $consulta = $conexion->prepare($sql);
    return $consulta->execute([
        ':nombre' => $nombre,
        ':precio' => $precio,
        ':unidades' => $unidades
    ]);
}

// UPDATE: Modificar un producto existente
function actualizarProducto(PDO $conexion, int $id, string $nombre, float $precio, int $unidades): bool
{
    $sql = 'UPDATE productos SET nombre = :nombre, precio = :precio, unidades = :unidades WHERE id = :id';
    $consulta = $conexion->prepare($sql);
    return $consulta->execute([
        ':id' => $id,
        ':nombre' => $nombre,
        ':precio' => $precio,
        ':unidades' => $unidades
    ]);
}

// DELETE: Eliminar un producto por su ID
function eliminarProducto(PDO $conexion, int $id): bool
{
    $sql = 'DELETE FROM productos WHERE id = :id';
    $consulta = $conexion->prepare($sql);
    return $consulta->execute([':id' => $id]);
}
