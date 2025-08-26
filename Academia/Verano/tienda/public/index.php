<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Modelos\Producto;
use App\Servicios\ProductoServicio;
$productoServ = new ProductoServicio();
$productos = $productoServ->aleatorios(4);
if (isset($_GET["error"]))
    $error = $_GET["error"];
else
    $error = '';

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda virtual</title>
</head>

<body class="container-fluid bg-secondary">
    <header>
        <?php echo '<div class="container-fluid">
        <div class="row"><div class="col">';
        menu();
        echo '</div></div>';
        if ($error != '') {
            switch ($error) {
                case 0:
                    echo '<div class="alert alert-danger">Contraseña incorrecta.</div>';
                    break;
            }
        }
        echo '</div>'; ?>
    </header>
    <content>
        <div class="row">
            <div class="col">
                <?php
                carruselBanner();
                ?>
            </div>
        </div>
        <div class="row">
            <?php
            tarjetas($productos);
            ?>
        </div>
    </content>
    <footer class="container bg-body-tertiary mb-3 p-5 text-center rounded-3 w-75">
        <div class="bg-tertiary">Tienda virtual &copy 2025</div>
    </footer>
</body>

</html>