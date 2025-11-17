<?php
declare(strict_types=1);

/*
  Ejercicio 3: Extensión del buscador de películas.
  - Añadimos un array con imágenes (pueden ser URLs o rutas locales).
  - Mostramos también el número de películas encontradas.
*/

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

/* Array paralelo con imágenes (pueden ser URLs absolutas o rutas locales a /img/) */
$imagenes = [
    "Inception" => "./resources/inception.jpg",
    "The Matrix" => "resources/matrix.jpg",
    "Interstellar" => "resources/interstellar.jpg",
    "Titanic" => "resources/titanic.jpg",
    "Gladiator" => "resources/gladiator.jpg",
    "Avatar" => "resources/avatar.jpg",
    "The Godfather" => "resources/godfather.jpg",
    "Pulp Fiction" => "resources/pulpfiction.jpg",
    "Forrest Gump" => "resources/forrestgump.jpg",
    "The Dark Knight" => "resources/darkknight.jpg",
];

$resultados = [];
$busqueda = $_POST['busqueda'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $busqueda !== '') {
    foreach ($peliculas as $titulo => $info) {
        if (stripos($titulo, $busqueda) !== false) {
            $resultados[$titulo] = $info;
        }
    }
}
?>

<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Ejercicio 3 - Buscador con imágenes</title>
    <style>
        body{font-family: Arial, sans-serif; padding:20px; max-width:700px}
        .resultado{margin-top:20px; padding:12px; background:#f4f4f4; border:1px solid #ddd}
        img{max-width:150px; display:block; margin-top:10px}
    </style>
</head>
<body>
    <h1>Buscador de películas con imágenes</h1>

    <form method="post" action="<?= htmlspecialchars($_SERVER['PHP_SELF']) ?>">
        <label>
            Buscar por título:
            <input type="text" name="busqueda" value="<?= htmlspecialchars($busqueda) ?>" />
        </label>
        <button type="submit">Buscar</button>
    </form>

    <?php if ($busqueda !== ''): ?>
        <h2>Resultados de la búsqueda:</h2>
        <p>Se encontraron <?= count($resultados) ?> película(s).</p>
        <?php if ($resultados): ?>
            <?php foreach ($resultados as $titulo => $info): ?>
                <div class="resultado">
                    <strong><?= htmlspecialchars($titulo) ?></strong> (<?= $info['año'] ?>)<br>
                    <?= htmlspecialchars($info['sinopsis']) ?><br>
                    <?php if (isset($imagenes[$titulo])): ?>
                        <img src="<?= htmlspecialchars($imagenes[$titulo]) ?>" alt="<?= htmlspecialchars($titulo) ?>">
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>No se encontraron películas con ese título.</p>
        <?php endif; ?>
    <?php endif; ?>
</body>
</html>
