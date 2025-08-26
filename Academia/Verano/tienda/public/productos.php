<?php
session_start();
require_once __DIR__ . '/../vendor/autoload.php';
use App\Servicios\UsuarioServicio;
use App\Servicios\CategoriaServicio;
use App\Servicios\ProductoServicio;
$usuarioServ = new UsuarioServicio();
$categoriaServ = new CategoriaServicio();
$productoServ = new ProductoServicio();

if (isset($_GET["m"])) {
    $m = $_GET["m"];
} else
    $m = '';
if ($m != '' && $m == 'categoria') {
    $categoria = $categoriaServ->porId($_POST["id_categoria"]);
    $listadoProductos = $productoServ->porCategoria($categoria);

}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
</head>

<body>

    <body class="container-fluid bg-secondary">
        <header>
            <?php echo '<div class="row"><div class="col">';
            menu();
            echo '</div></div>'; ?>
        </header>
        <content>
            <?php
            $usuario = $usuarioServ->porId($_SESSION["ID_USUARIO"]);
            echo '
            <div class="container-fluid w-50 mb-3">
                <form method="post" action="productos.php?m=categoria">
                <div class="input-group">
                    <span class="input-group-text">Selecciona categoría</span>
                    <select name="id_categoria" class="form-control">
                    <option>Selecciona categoría</option>';
            $listaCategorias = $categoriaServ->listarTodos();
            foreach ($listaCategorias as $el) {
                echo '<option value="' . $el->getId() . '">' . $el->getDetalle() . '</option>';
            }
            echo '</select>
            <input type="submit" class="btn btn-primary" value="Buscar">
                </div>
                </form>
            </div>
            ';
            if ($m == 'categoria') {
                echo '<div class="container-fluid">';
                tarjetas($listadoProductos);
                echo '</div>';
            }
            ?>
        </content>

        <footer class="container bg-body-tertiary mb-3 p-5 text-center rounded-3 w-75">
            <div class="bg-tertiary">Tienda virtual &copy 2025</div>
        </footer>
    </body>

</html>