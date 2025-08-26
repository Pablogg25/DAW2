<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Repositorio\LibroRepo;

if (isset($_GET["m"]))
    $m = $_GET["m"];
else
    $m = "";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejemplo base datos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <header>
        <?php menu(); ?>
    </header>
    <content>
        <?php

        switch ($m) {
            case "": {

                break;
            }
            case "nuevo": {
                echo '
                    <form method="post" action="procesa.php?modo=nuevo">';
                echo '<label for="cod_libro">Código libro:</label>
    <input type="text" name="cod_libro" required><br><br>
    <label for="titulo">Título:</label>
    <input type="text" name="titulo" required><br><br>
    <label for="autor">Autor:</label>
    <input type="text" name="autor" required><br><br>
    <label for="copias">Copias:</label>
    <input type="number" name="copias" required><br><br>
    <input type="submit" class="btn btn-success" value="Guardar">';
                echo '</form>';
                echo '<br><br><a href="index.php" class="btn btn-primary">Volver</a>';

                break;
            }
            case "listar": {
                $libroRepo = new LibroRepo();
                $lista = $libroRepo->listarTodos();
                echo '<table class="table"><tr><th>Código libro</th>
    <th>Título</th><th>Autor</th><th>Copias</th><th></th><th></th></tr>';
                foreach ($lista as $libro) {
                    echo '<tr><td>' . $libro->getCodLibro() . '</td>
        <td>' . $libro->getTitulo() . '</td>
        <td>' . $libro->getAutor() . '</td>
        <td>' . $libro->getCopias() . '</td>
        <td><a href="ficha.php?cod_libro=' . $libro->getCodLibro() . '" class="btn btn-primary">VER</a></td>
        <td><a href="procesa.php?modo=elimina&cod_libro=' . $libro->getCodLibro() . '" class="btn btn-danger">ELIMINAR</a></td></tr>';
                }
                echo '</table>';
            }
        }


        ?>
    </content>
</body>

</html>