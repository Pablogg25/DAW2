<?php
require_once __DIR__ . '/conexion.php';
require_once __DIR__ . '/producto_modelo.php';
require_once __DIR__ . '/validaciones.php';

$errores = [];
$productoEditar = null;

$mensajeExito = match ($_GET['ok'] ?? '') {
    'insertado' => 'Producto añadido correctamente.',
    'actualizado' => 'Producto actualizado correctamente.',
    'eliminado' => 'Producto eliminado correctamente.',
    default => ''
};

try {
    // 1. Procesar alta o edición (POST)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
        $validacion = validarFormularioProducto($_POST);
        $errores = $validacion['errores'];
        $datos = $validacion['datos'];

        if (empty($errores)) {
            if ($id) {
                actualizarProducto($conexion, $id, $datos['nombre'], $datos['precio'], $datos['unidades']);
                header('Location: index.php?ok=actualizado');
                exit;
            } else {
                insertarProducto($conexion, $datos['nombre'], $datos['precio'], $datos['unidades']);
                header('Location: index.php?ok=insertado');
                exit;
            }
        } elseif ($id) {
            $productoEditar = [
                'id' => $id,
                'nombre' => $_POST['nombre'] ?? '',
                'precio' => $_POST['precio'] ?? '',
                'unidades' => $_POST['unidades'] ?? ''
            ];
        }
    }

    // 2. Procesar eliminación o carga de edición (GET)
    $accion = $_GET['accion'] ?? '';
    $idGet = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

    if ($accion === 'eliminar' && $idGet) {
        eliminarProducto($conexion, $idGet);
        header('Location: index.php?ok=eliminado');
        exit;
    } elseif ($accion === 'editar' && $idGet) {
        $productoEditar = obtenerProductoPorId($conexion, $idGet);
    }

    // 3. Obtener listado actualizado
    $productos = obtenerProductos($conexion);
} catch (PDOException $e) {
    error_log($e->getMessage());
    $errores[] = 'No ha sido posible realizar la operación en la base de datos.';
    $productos = [];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>CRUD de Productos</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 850px; margin: 30px auto; padding: 0 15px; }
        .alerta-error { background: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; margin-bottom: 15px; }
        .alerta-ok { background: #d4edda; color: #155724; padding: 10px; border: 1px solid #c3e6cb; margin-bottom: 15px; }
        form { background: #f4f4f4; padding: 15px; border: 1px solid #ddd; margin-bottom: 25px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
        th { background: #333; color: white; }
    </style>
</head>
<body>

    <h1>Gestión de Productos (CRUD)</h1>

    <?php if (!empty($errores)): ?>
        <div class="alerta-error">
            <ul>
                <?php foreach ($errores as $error): ?>
                    <li><?= escapar($error) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <?php if ($mensajeExito !== ''): ?>
        <div class="alerta-ok"><?= escapar($mensajeExito) ?></div>
    <?php endif; ?>

    <h2><?= $productoEditar ? 'Editar producto' : 'Nuevo producto' ?></h2>
    <form action="index.php" method="post">
        <input type="hidden" name="id" value="<?= $productoEditar ? escapar($productoEditar['id']) : '' ?>">

        <p>
            <label>Nombre:<br>
                <input type="text" name="nombre" required value="<?= $productoEditar ? escapar($productoEditar['nombre']) : '' ?>">
            </label>
        </p>
        <p>
            <label>Precio (€):<br>
                <input type="number" name="precio" step="0.01" min="0" required value="<?= $productoEditar ? escapar($productoEditar['precio']) : '' ?>">
            </label>
        </p>
        <p>
            <label>Unidades:<br>
                <input type="number" name="unidades" min="0" required value="<?= $productoEditar ? escapar($productoEditar['unidades']) : '' ?>">
            </label>
        </p>

        <button type="submit"><?= $productoEditar ? 'Guardar cambios' : 'Insertar producto' ?></button>
        <?php if ($productoEditar): ?>
            <a href="index.php">Cancelar edición</a>
        <?php endif; ?>
    </form>

    <h2>Listado de productos</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Unidades</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($productos)): ?>
                <tr><td colspan="5">No hay productos registrados.</td></tr>
            <?php else: ?>
                <?php foreach ($productos as $producto): ?>
                    <tr>
                        <td><?= escapar($producto['id']) ?></td>
                        <td><?= escapar($producto['nombre']) ?></td>
                        <td><?= escapar(number_format((float) $producto['precio'], 2, ',', '.')) ?> €</td>
                        <td><?= escapar($producto['unidades']) ?></td>
                        <td>
                            <a href="index.php?accion=editar&id=<?= escapar($producto['id']) ?>">Editar</a> |
                            <a href="index.php?accion=eliminar&id=<?= escapar($producto['id']) ?>" onclick="return confirm('¿Eliminar este producto?');">Eliminar</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>

</body>
</html>