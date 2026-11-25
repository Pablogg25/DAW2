<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__ . '/config/factoriaAplicacion.php';
require_once __DIR__ . '/entidades/Producto.php';
require_once __DIR__ . '/config/configuracion.php';

if ($tipoDAO === 'MEMORIA') {
    require __DIR__
        . '/presentacion/vistaMemoria.php';

    exit();
}

$factoria = new FactoriaAplicacion();
$service = $factoria->crearProductoService();

/*
 * INSERT
 */
if (isset($_POST['insertar'])) {
    $producto = new Producto(
        0,
        $_POST['nombre'],
        (float) $_POST['precio']
    );

    $service->altaProducto(
        $producto
    );

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

    $service->actualizarProducto(
        $producto
    );

    header('Location: index.php');
    exit();
}

/*
 * DELETE
 */
if (isset($_POST['borrar'])) {
    $service->borrarProducto(
        (int) $_POST['id']
    );

    header('Location: index.php');
    exit();
}

/*
 * TRANSACCION (reemplazar producto: borrar + insertar)
 *
 * Los datos están fijados en el código (hardcodeados):
 *   sustituye el producto "Ratón" por "Ratón Gaming" (25 €).
 *
 * PRECONDICIÓN antes de pulsar el botón:
 *   debe existir en la base de datos un producto cuyo nombre sea
 *   exactamente "Ratón".
 *
 * Si NO se cumple (por ejemplo, porque ya se ejecutó una vez y el
 * producto "Ratón" ya no existe), la capa de datos lanza una
 * excepción, hace ROLLBACK (no se modifica nada) y aquí se captura
 * para que la página no se rompa: se recarga la lista sin cambios.
 */
if (isset($_POST['transaccion'])) {
    try {
        $service->reemplazarProducto(
            'Ratón',
            'Ratón Gaming',
            25
        );
    } catch (Throwable $e) {
        // Precondición no cumplida o fallo en la transacción:
        // ya se ha hecho rollback, no hay nada más que deshacer.
    }

    header('Location: index.php');
    exit();
}

/*
 * READ
 */
$productos = $service->obtenerProductos();

require __DIR__ . '/presentacion/vista.php';
