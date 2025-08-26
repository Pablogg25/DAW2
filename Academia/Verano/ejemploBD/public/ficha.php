<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Repositorio\LibroRepo;
if (isset($_GET["cod_libro"]))
    $codLibro = $_GET["cod_libro"];
else
    $codLibro = "";
$libroRepo = new LibroRepo();
$libro = $libroRepo->porId($codLibro);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha de <?php echo $libro->getTitulo(); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <?php
    echo '<form method="post" action="procesa.php?modo=modifica&cod_libro=' . $libro->getCodLibro() . '">';
    echo '<label for="cod_libro">Código libro:</label>
    <input type="text" value="' . $libro->getCodLibro() . '" name="cod_libro" required><br><br>
    <label for="titulo">Título:</label>
    <input type="text" value="' . $libro->getTitulo() . '" name="titulo" required><br><br>
    <label for="autor">Autor:</label>
    <input type="text" value="' . $libro->getAutor() . '" name="autor" required><br><br>
    <label for="copias">Copias:</label>
    <input type="number" value="' . $libro->getcopias() . '" name="copias" required><br><br>
    <input type="submit" class="btn btn-success" value="Modificar">';
    echo '</form>';
    echo '<br><br><a href="index.php" class="btn btn-primary">Volver</a>';
    ?>
</body>

</html>