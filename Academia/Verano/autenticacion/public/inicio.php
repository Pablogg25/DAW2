<?php
session_start();
require_once __DIR__ . '/../vendor/autoload.php';
use App\Servicios\UsuarioServicio;

$usuarioServ = new UsuarioServicio();
if (isset($_SESSION["id_usuario"]) && $_SESSION["id_usuario"] != -1)
    $usuario = $usuarioServ->porId($_SESSION["id_usuario"]);
else
    $usuario = null;
if ($usuario == null) {
    echo 'No existe el usuario o contraseña incorrecta';    
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="http
    s   ://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <title>Bienvenido <?php if($usuario!=null)echo $usuario->getUsuario(); ?>
</title>
</head>

<body>
    <?php
    if($usuario!=null)echo '<h4>Bienvenido '.$usuario->getUsuario().'';
    echo '<br><br><a href="index.php" class="btn btn-danger">Volver</a>'
    ?>
</body>

</html>