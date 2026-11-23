
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>CRUD Productos</title>
</head>

<body>

    <h1>CRUD Productos</h1>

    <h2>Nuevo producto</h2>

    <form action="index.php" method="post">

        <label>
            Nombre:
            <input
                type="text"
                name="nombre"
                required>
        </label>

        <br><br>

        <label>
            Precio:
            <input
                type="number"
                step="0.01"
                name="precio"
                required>
        </label>

        <br><br>

        <button
            type="submit"
            name="insertar">
            Insertar
        </button>

    </form>

    <hr>

    <h2>Listado de productos</h2>

    <table border="1" cellpadding="5">

        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Actualizar</th>
            <th>Borrar</th>
        </tr>

        <?php foreach ($productos as $producto): ?>

            <tr>

                <form action="index.php" method="post">

                    <td>
                        <?= $producto->id ?>

                        <input
                            type="hidden"
                            name="id"
                            value="<?= $producto->id ?>">
                    </td>

                    <td>
                        <input
                            type="text"
                            name="nombre"
                            value="<?= $producto->nombre ?>"
                            required>
                    </td>

                    <td>
                        <input
                            type="number"
                            name="precio"
                            step="0.01"
                            value="<?= $producto->precio ?>"
                            required>
                    </td>

                    <td>
                        <button
                            type="submit"
                            name="actualizar">
                            Actualizar
                        </button>
                    </td>

                    <td>
                        <button
                            type="submit"
                            name="borrar">
                            Borrar
                        </button>
                    </td>

                </form>

            </tr>

        <?php endforeach; ?>

    </table>

</body>

</html>