<?php
try {
    $conexion = new PDO(
        'mysql:host=localhost;dbname=tienda;charset=utf8mb4',
        'root',
        'r00tMy$ql'
    );
    // echo 'Conexión realizada';
} catch (PDOException $e) {
    echo 'No se ha podido conectar con la base de datos';
}

$resultado = $conexion->query('SELECT nombre,precio FROM productos');
// echo var_dump($resultado);
if ($resultado) {
    foreach ($resultado as $producto) {
        echo '<br>Producto: ' . $producto['nombre'] . ' | Precio: ' . $producto['precio'];
    }
}

// Insertar Registro
/*$filas = $conexion->exec("INSERT INTO productos (nombre, precio, unidades)
VALUES ('Altavoces', 32.90, 8)"
);
echo "Filas insertadas: " . $filas;*/

// Actualizar Registros
$filas = $conexion->exec(
    'UPDATE productos
SET precio = 29.90
WHERE id = 1'
);
// echo '<br>Filas modificadas: ' . $filas;

// Eliminar Registros

$filas = $conexion->exec('DELETE
 FROM productos
WHERE id = 4');

// Metodos Principales
try {
    $conexion->beginTransaction();
    $conexion->exec(
        'UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1'
    );
    $conexion->exec(
        'UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2'
    );
    $conexion->commit();
    echo 'Operación realizada';
} catch (PDOException $e) {
    if ($conexion->inTransaction()) {
        $conexion->rollBack();
    }
    echo 'No se pudo completar la operación';
}

?>
