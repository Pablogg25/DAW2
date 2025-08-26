<?php
$usuarioLogueado = session_start();
require_once __DIR__ . '/../vendor/autoload.php';
use App\Servicios\UsuarioServicio;
use App\Modelos\Usuario;

$usuarioServ = new UsuarioServicio();

if (isset($_GET["m"]))
    $m = $_GET["m"];
else
    $m = '';
if (!$usuarioLogueado) {
    $m = 'login';
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios</title>
</head>

<body class="container-fluid bg-secondary">
    <header>
        <?php echo '<div class="container-fluid">
        <div class="row"><div class="col">';
        menu();
        echo '</div></div></div>'; ?>
    </header>
    <content>
        <div class="container-fluid bg-white w-50 p-3 mb-4 rounded-3">
            <?php
            if ($m != '') {
                switch ($m) {
                    case 'login':
                        echo '
            <form class="form" method="post" action="login.php?m=acceso">
        <label for="usuario">Usuario</label>
        <input type="text" name="usuario" class="form-control" required>
        <label for="password">Contraseña</label>
        <input type="password" name="password" class="form-control" required>
        <p class="text-end"><button type="submit" class="btn btn-success mt-3">Acceder</button></p>
        </form>';
                        break;

                    //Controlo que el usuario exista e inicio su sesión
            
                    case 'acceso':
                        $nombreUsuario = $_POST["usuario"];
                        $password = $_POST["password"];
                        $usuario = $usuarioServ->porNombre($nombreUsuario);
                        if ($usuario == null) {
                            header('Location:login.php?m=nuevoUsuario');
                        } else {
                            if (password_verify($password, $usuario->getPass())) {
                                session_start();
                                $_SESSION["ID_USUARIO"] = $usuario->getId();
                                header('Location:productos.php');
                            } else {
                                header('Location:index.php?error=0');
                            }
                        }
                        break;

                    case 'nuevoUsuario':
                        echo '
            <form class="form" method="post" action="login.php?m=altaUsuario">
        <label for="usuario">Usuario</label>
        <input type="text" name="usuario" class="form-control" required>
        <label for="password">Contraseña</label>
        <input type="password" name="password" class="form-control" required>
        <label for="password2">Confirmar contraseña</label>
        <input type="password" name="password2" class="form-control" required>
        <p class="text-end"><button type="submit" class="btn btn-success mt-3">Acceder</button></p>
        </form>';
                        break;

                    //Compruebo si el nombre de usuario está en la bd y si no, lo registro
                    // cifrando la contraseña con BCRYPT
            
                    case 'altaUsuario':
                        $usuario = $_POST["usuario"];
                        $password = $_POST["password"];
                        $password2 = $_POST["password2"];
                        if ($usuarioServ->porNombre($usuario) == null) {
                            if ($password == $password2) {
                                $usuarioInsertado = $usuarioServ->inserta(new Usuario(0, $usuario, $password));
                                if ($usuarioInsertado != null) {
                                    header('Location:productos.php');
                                }
                            } else {
                                echo '<br>Las contraseñas no coinciden.<br>';
                            }
                        } else {
                            echo '<br>Ya existe el usuario<br>';
                        }
                        break;

                    case "desconectar":
                        session_destroy();
                        header('Location:index.php');
                        break;
                }
            }
            ?>
        </div>
    </content>
    <footer class="container bg-body-tertiary mb-3 p-5 text-center rounded-3 w-75">
        <div class="bg-tertiary">Tienda virtual &copy 2025</div>
    </footer>
</body>

</html>

?>