<?php
// 1. Array reducido (solo 3 películas para el ejemplo)
$peliculas = [
    "Volver" => ["año" => 2006, "sinopsis" => "Drama de Pedro Almodóvar."],
    "Tesis" => ["año" => 1996, "sinopsis" => "Suspense universitario."],
    "Celda 211" => ["año" => 2009, "sinopsis" => "Motín en una prisión."]
];

// 2. Recogemos la búsqueda (si no existe, se queda en blanco)
$busqueda = $_POST['busqueda'] ?? '';
?>

<!DOCTYPE html>
<html>
<body>
    <!-- 3. Formulario simplificado (sin 'action' se envía a la misma página) -->
    <form method="post">
        Buscar: <input type="text" name="busqueda" value="<?= $busqueda ?>">
        <button>Buscar</button>
    </form>

    <!-- 4. Lógica de impresión directa -->
    <?php
    if ($busqueda) {
        foreach ($peliculas as $titulo => $info) {
            // stripos es mejor que strpos porque no distingue mayúsculas/minúsculas
            if (stripos($titulo, $busqueda) !== false) {
                echo "<p><b>$titulo</b> ({$info['año']}) - {$info['sinopsis']}</p>";
            } 
        }
    }
    ?>
</body>
</html>