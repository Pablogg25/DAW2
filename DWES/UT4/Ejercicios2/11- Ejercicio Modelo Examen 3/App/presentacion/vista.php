<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>CRUD Componentes PC</title>
</head>

<body>

    <h1>CRUD Componentes PC</h1>

    <?php if (!empty($mensaje)): ?>
        <p style="color: green;"><strong><?= htmlspecialchars($mensaje) ?></strong></p>
    <?php endif; ?>

    <?php if (!empty($error)): ?>
        <p style="color: red;"><strong><?= htmlspecialchars($error) ?></strong></p>
    <?php endif; ?>

    <h2>Nuevo componente</h2>

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

    <h2>Sustituir componente</h2>

    <p>
        Elimina el componente indicado e inserta el nuevo en una única
        transacción: si algo falla, no se modifica nada.
    </p>

    <form action="index.php" method="post">

        <label>
            Nombre del componente a sustituir:
            <input
                type="text"
                name="nombreAntiguo"
                required>
        </label>

        <br><br>

        <label>
            Nombre del nuevo componente:
            <input
                type="text"
                name="nombreNuevo"
                required>
        </label>

        <br><br>

        <label>
            Precio del nuevo componente:
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

    <h2>Listado de componentes</h2>

    <table border="1" cellpadding="5">

        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Actualizar</th>
            <th>Borrar</th>
        </tr>

        <?php foreach ($componentes as $componente): ?>

            <tr>

                <form action="index.php" method="post">

                    <td>
                        <?= $componente->id ?>

                        <input
                            type="hidden"
                            name="id"
                            value="<?= $componente->id ?>">
                    </td>

                    <td>
                        <input
                            type="text"
                            name="nombre"
                            value="<?= htmlspecialchars($componente->nombre) ?>"
                            required>
                    </td>

                    <td>
                        <input
                            type="number"
                            name="precio"
                            step="0.01"
                            value="<?= $componente->precio ?>"
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