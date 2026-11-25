<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>CRUD Motocicletas</title>
</head>

<body>

    <h1>CRUD Motocicletas</h1>

    <?php if (!empty($mensaje)): ?>
        <p style="color: green;"><strong><?= htmlspecialchars($mensaje) ?></strong></p>
    <?php endif; ?>

    <?php if (!empty($error)): ?>
        <p style="color: red;"><strong><?= htmlspecialchars($error) ?></strong></p>
    <?php endif; ?>

    <h2>Nueva motocicleta</h2>

    <form action="index.php" method="post">

        <label>
            Modelo:
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

    <h2>Sustituir motocicleta</h2>

    <p>
        Elimina la motocicleta indicada e inserta la nueva en una única
        transacción: si algo falla, no se modifica nada.
    </p>

    <form action="index.php" method="post">

        <label>
            Modelo de la moto a sustituir:
            <input
                type="text"
                name="modeloAntiguo"
                required>
        </label>

        <br><br>

        <label>
            Modelo de la nueva moto:
            <input
                type="text"
                name="modeloNuevo"
                required>
        </label>

        <br><br>

        <label>
            Precio de la nueva moto:
            <input
                type="number"
                step="0.01"
                name="precio"
                required>
        </label>

        <br><br>

        <button
            type="submit"
            name="sustituir">
            Sustituir
        </button>

    </form>

    <hr>

    <h2>Listado de motocicletas</h2>

    <table border="1" cellpadding="5">

        <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Actualizar</th>
            <th>Borrar</th>
        </tr>

        <?php foreach ($motos as $moto): ?>

            <tr>

                <form action="index.php" method="post">

                    <td>
                        <?= $moto->id ?>

                        <input
                            type="hidden"
                            name="id"
                            value="<?= $moto->id ?>">
                    </td>

                    <td>
                        <input
                            type="text"
                            name="nombre"
                            value="<?= htmlspecialchars($moto->modelo) ?>"
                            required>
                    </td>

                    <td>
                        <input
                            type="number"
                            name="precio"
                            step="0.01"
                            value="<?= $moto->precio ?>"
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