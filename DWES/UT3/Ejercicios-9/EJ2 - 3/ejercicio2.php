<?php

declare(strict_types=1);
$peliculas = [
    "Inception" => ["año" => 2010, "sinopsis" => "Un ladrón roba secretos entrando en los sueños."],
    "The Matrix" => ["año" => 1999, "sinopsis" => "Un hacker descubre la verdad sobre su realidad."],
    "Interstellar" => ["año" => 2014, "sinopsis" => "Exploradores viajan a través de un agujero de gusano."],
    "Titanic" => ["año" => 1997, "sinopsis" => "Historia de amor en el famoso barco hundido."],
    "Gladiator" => ["año" => 2000, "sinopsis" => "Un general romano busca venganza como gladiador."],
    "Avatar" => ["año" => 2009, "sinopsis" => "Un exmarine se une a los Na'vi en Pandora."],
    "The Godfather" => ["año" => 1972, "sinopsis" => "La historia de la familia Corleone."],
    "Pulp Fiction" => ["año" => 1994, "sinopsis" => "Historias entrelazadas de crimen en Los Ángeles."],
    "Forrest Gump" => ["año" => 1994, "sinopsis" => "Un hombre sencillo vive momentos clave de la historia."],
    "The Dark Knight" => ["año" => 2008, "sinopsis" => "Batman enfrenta al Joker en Gotham."],
];
$resultados = [];
$busqueda = $_POST['busqueda'] ?? '';
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || $busqueda !== '') {
    foreach ($peliculas as $titulo => $info) {
        if (stripos($titulo, $busqueda) !== false) {
            $resultados[$titulo] = $info;
        }
    }
}
?>
<!doctype html>
<html lang="es">

<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Ejercicio 2 - Buscador de películas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 700px
        }

        .resultado {
            margin-top: 20px;
            padding: 12px;
            background: #f4f4f4;
            border: 1px solid #ddd
        }
    </style>
</head>

<body>
    <h1>Buscador de películas</h1>

    <form method="post" action="<?= htmlspecialchars($_SERVER['PHP_SELF']) ?>">
        <label>
            Buscar por título:
            <input type="text" name="busqueda" value="<?= htmlspecialchars($busqueda) ?>" />
        </label>
        <button type="submit">Buscar</button>
    </form>

    <?php if ($busqueda !== ''): ?>
        <h2>Resultados de la búsqueda:</h2>
        <?php if ($resultados): ?>
            <?php foreach ($resultados as $titulo => $info): ?>
                <div class="resultado">
                    <strong><?= htmlspecialchars($titulo) ?></strong> (<?= $info['año'] ?>)<br>
                    <?= htmlspecialchars($info['sinopsis']) ?>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>No se encontraron películas con ese título.</p>
        <?php endif; ?>
    <?php endif; ?>
</body>

</html>