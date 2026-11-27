
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>CRUD Vehículos</title>
</head>

<body>

    <h1>CRUD Vehículos</h1>

    <h2>Nuevo vehículo</h2>

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
            Precio (k$):
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

    <h2>Transacción</h2>

    <p>
        Sustituye el vehículo <strong>Moto</strong> por
        <strong>Moto Tuneada</strong> (25 k$): borra uno e inserta el otro
        en una única transacción.
    </p>

    <p>
        <strong>Precondición:</strong> debe existir un vehículo llamado
        exactamente <em>Moto</em>. Si no existe, la transacción lanzará
        una excepción, se hará rollback y no se modificará nada.
    </p>

    <form action="index.php" method="post">

        <button
            type="submit"
            name="transaccion">
            Ejecutar transacción
        </button>

    </form>

    <hr>

    <h2>Listado de vehículos</h2>

    <table border="1" cellpadding="5">

        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio (k$)</th>
            <th>Actualizar</th>
            <th>Borrar</th>
        </tr>

        <?php foreach ($vehiculos as $vehiculo): ?>

            <tr>

                <form action="index.php" method="post">

                    <td>
                        <?= $vehiculo->id ?>

                        <input
                            type="hidden"
                            name="id"
                            value="<?= $vehiculo->id ?>">
                    </td>

                    <td>
                        <input
                            type="text"
                            name="nombre"
                            value="<?= $vehiculo->nombre ?>"
                            required>
                    </td>

                    <td>
                        <input
                            type="number"
                            name="precio"
                            step="0.01"
                            value="<?= $vehiculo->precio ?>"
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