<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Repositorio\LibroRepo;
use App\Modelos\Libro;
if (isset($_GET["modo"]))
    $modo = $_GET["modo"];
else
    $modo = "";

switch ($modo) {
    case "modifica": {
        if (isset($_GET["cod_libro"]))
            $cod_libro = $_GET["cod_libro"];
        else
            $cod_libro = "";
        if ($cod_libro != "") {
            $libroRepo = new LibroRepo();
            $titulo = $_POST["titulo"];
            $autor = $_POST["autor"];
            $copias = $_POST["copias"];
            $libro = new Libro($autor, $cod_libro, $copias, $titulo);
            $resultado = $libroRepo->modifica($cod_libro, $libro);
            if ($resultado) {
                header('Location:index.php');
            }
        }
        break;
    }

    case "nuevo": {
        $titulo = $_POST["titulo"];
        $autor = $_POST["autor"];
        $codLibro = $_POST["cod_libro"];
        $copias = $_POST["copias"];
        $libro = new Libro($autor, $codLibro, $copias, $titulo);
        $libroRepo = new LibroRepo();
        if ($libroRepo->inserta($libro)) {
            header('Location:index.php');
        }
        break;
    }

    case "elimina": {
        $cod_libro = $_GET["cod_libro"];
        $libroRepo = new LibroRepo();
        if ($libroRepo->elimina($cod_libro)) {
            header('Location:index.php?m=listar');
        }
        break;
    }
}
?>