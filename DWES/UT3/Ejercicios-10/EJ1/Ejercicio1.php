<?php
session_start(); // Iniciar sesión

// Inicializamos el array de coches en la sesión la primera vez
if (!isset($_SESSION['coches'])) {
    $_SESSION['coches'] = [
        "Toyota" => ["Corolla", "Yaris", "Prius"],
        "Ford" => ["Focus", "Fiesta", "Mustang"],
        "BMW" => ["Serie 3", "Serie 5", "X5"]
    ];
}

$coches = $_SESSION['coches']; // Traemos los coches de la sesión
$marcaSeleccionada = $_POST['marca'] ?? null;
$modelosOriginales = $coches[$marcaSeleccionada] ?? [];
$modelosActualizados = $_POST['modelos'] ?? [];

$modificados = [];

// Si se pulsa actualizar, comprobar cambios y actualizar la sesión
if (isset($_POST['actualizar']) && $marcaSeleccionada) {
    foreach ($modelosOriginales as $indice => $modelo) {
        if (isset($modelosActualizados[$indice]) && $modelosActualizados[$indice] !== $modelo) {
            $modificados[] = "El modelo '{$modelo}' fue modificado a '{$modelosActualizados[$indice]}'";
            $modelosOriginales[$indice] = $modelosActualizados[$indice];
        }
    }
    // Guardamos los cambios en la sesión
    $_SESSION['coches'][$marcaSeleccionada] = $modelosOriginales;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Marcas y modelos de coches con sesión</title>
</head>
<body>
    <h2>Selecciona una marca de coches</h2>
    <form method="post">
        <select name="marca">
            <option value="">-- Elige una marca --</option>
            <?php
            foreach ($coches as $marca => $modelos) {
                $selected = ($marca === $marcaSeleccionada) ? "selected" : "";
                echo "<option value='$marca' $selected>$marca</option>";
            }
            ?>
        </select>
        <input type="submit" name="mostrar" value="Mostrar">

        <?php if ($marcaSeleccionada && isset($_POST['mostrar'])): ?>
            <h3>Modelos de <?php echo $marcaSeleccionada; ?></h3>
            <table border="1" cellpadding="5">
                <tr><th>Modelo</th></tr>
                <?php foreach ($modelosOriginales as $indice => $modelo): ?>
                    <tr>
                        <td>
                            <input type="text" name="modelos[<?php echo $indice; ?>]"
                                   value="<?php echo htmlspecialchars($modelo); ?>">
                        </td>
                    </tr>
                <?php endforeach; ?>
            </table>
            <br>
            <input type="submit" name="actualizar" value="Actualizar">
        <?php endif; ?>
    </form>

    <?php
    // Mostrar modelos modificados
    if (!empty($modificados)) {
        echo "<h3>Modelos modificados:</h3><ul>";
        foreach ($modificados as $m) {
            echo "<li>$m</li>";
        }
        echo "</ul>";
    }
    ?>
</body>
</html>
