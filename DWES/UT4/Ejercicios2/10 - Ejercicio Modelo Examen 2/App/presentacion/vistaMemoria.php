<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Prueba DAO en Memoria - Motocicletas</title>
</head>

<body>

    <h1>Ejecución en Memoria (sin persistencia entre peticiones)</h1>

    <p>
        En modo <strong>MEMORIA</strong>, cada petición HTTP crea una nueva instancia de
        <code>MotoMemoriaDAO</code> con los datos iniciales del constructor.
    </p>

    <h2>1. Catálogo inicial</h2>
    <table border="1" cellpadding="5">
        <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Precio</th>
        </tr>
        <?php foreach ($motos as $moto): ?>
            <tr>
                <td><?= $moto->id ?></td>
                <td><?= htmlspecialchars($moto->modelo) ?></td>
                <td><?= number_format($moto->precio, 2, ',', '.') ?> €</td>
            </tr>
        <?php endforeach; ?>
    </table>

    <hr>

    <h2>2. Secuencia de operaciones en memoria</h2>
    <?php
    // TODO: Ejecutar aquí sobre $service una secuencia de prueba:
    // 1. Alta de una nueva moto (ej. 'Beta RR 300', 7600.00)
    // 2. Modificación de una moto existente
    // 3. Sustitución de una moto existente por otra
    // 4. Borrado de una moto
    // 5. Volver a obtener $motosFinales = $service->... y mostrar la tabla resultante
    ?>

</body>

</html>