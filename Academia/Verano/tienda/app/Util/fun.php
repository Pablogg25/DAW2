<?php
//session_start();
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Servicios\UsuarioServicio;
use App\Modelos\Usuario;



function menu()
{
  echo '<nav class="navbar navbar-expand-lg bg-body-tertiary w-100 mx-auto mb-3">
  <div class="container-fluid w-100">
    <a class="navbar-brand" href="index.php">Tienda virtual</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav gap-3">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.php">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="productos.php">Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="cesta.php">Mi compra</a>
        </li>';
  $usuarioServ = new UsuarioServicio();
  if (isset($_SESSION["ID_USUARIO"])) {
    $id_usuario = $_SESSION["ID_USUARIO"];
    $usuario = $usuarioServ->porId($id_usuario);
    loginUsuario($usuario);
  } else {
    loginUsuario(null);
  }
  echo '</ul>
    </div>
  </div>
</nav>';
  echo '
<div class="offcanvas offcanvas-top h-50" tabindex="-1" id="login" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">      
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="container-fluid w-25 bg-success p-3 rounded-2 text-white">    
        <form class="form" method="post" action="login.php?m=acceso">
        <label for="usuario">Usuario</label>
        <input type="text" name="usuario" class="form-control" required>
        <label for="password">Contraseña</label>
        <input type="password" name="password" class="form-control" required>
        <p class="text-end"><button type="submit" class="btn btn-warning mt-3">Acceder</button></p>
        </form>
    </div>
  </div>
</div>
';
}

function usuarioNoRegistrado(): void
{
  echo '
  <li class="nav-item">
          <button type="button" class="nav-link bg-danger text-white rounded-3" data-bs-toggle="offcanvas" data-bs-target="#login" aria-controls="offcanvasTop">Login</button>          
        </li>
        <li class="nav-item">
            <a href="login.php?m=nuevoUsuario" class="nav-link bg-success text-white rounded-3">Registrar usuario</a>
        </li>
  ';
}

function usuarioRegistrado(Usuario $u): void
{
  echo '
    <li class="nav-item">
    <p>Hola, ' . $u->getUsuario() . '</p>
    </li>
    <li class="nav-item">
      <a href="login.php?m=desconectar" class="nav-link bg-success text-white rounded-3">Desconectar</a>
    </li>
  ';
}

function loginUsuario(?Usuario $u): void
{
  if ($u == null) {
    usuarioNoRegistrado();
  } else {
    usuarioRegistrado($u);
  }
}

function carruselBanner()
{
  echo '
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
  <div class="carousel-inner w-75 mx-auto">
    <div class="carousel-item active">
      <img src="img/banner.webp" class="d-block w-100 rounded-3" alt="...">
    </div>
    <div class="carousel-item">
      <img src="img/banner1.webp" class="d-block w-100 rounded-3" alt="...">
    </div>
    <div class="carousel-item">
      <img src="img/banner2.webp" class="d-block w-100 rounded-3" alt="...">
    </div>
  </div>
</div>
    ';
}

function tarjetas(array $el): void
{
  echo '<div class="card-group mt-3 w-75 mx-auto justify-content-between">';
  foreach ($el as $p) {
    echo '
            <div class="card mb-3 p-3">
  <img src="' . $p->getFoto() . '" class="card-img-top p-2 w-75 mx-auto" alt="' . $p->getDetalle() . '">
  <div class="card-body">
    <h5 class="card-title">' . $p->getCategoria()->getDetalle() . '</h5>
    <p class="card-text">' . $p->getDetalle() . '</p>
    <div class="container-fluid text-end">
    <div class="row">
    <p class="col">Cantidad:</p>
    <div class="col">
    <form method="post" action="cesta.php?m=agrega&id_producto=' . $p->getId() . '">
    <input type="number" class="form-control" step="1" value="1" min="1" class="border-0 p-3" name="cantidad">
    </div>
    </div>
    </div>
    <p class="card-footer text-end text-white border-0 bg-success" style="font-weight:bold; font-size:26px">' . $p->getPrecio() . ' €</p>
    <p class="card-text text-end"><input type="submit" class="btn btn-danger" value="Añadir a la cesta"></p>
    </form>
  </div>
</div>
        ';
  }
  echo '</div>';
}


?>