<?php
declare(strict_types=1);

require_once __DIR__. "/../vendor/autoload.php";

use App\Clases\ServicioCorreo;
use App\Clases\ProveedorMailtrap;


$nombre = trim($_POST['nombre']?? "");
$email = trim($_POST['email']??"");
$mensaje = trim($_POST['mensaje']??"");

// 1. Validación de campos obligatorios
if ($nombre === '' || $email === '' || $mensaje === '') {
    header('Location: index.php?error=1');
    exit;
}

// 2. Validación del email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.php?error=2');
    exit;
}

$proveedor = new ProveedorMailtrap();
$servicio = new ServicioCorreo($proveedor);

$cuerpo = "Has recibido un mensaje desde el formulario de contacto.\n\n";
$cuerpo .= "Nombre: $nombre\n";
$cuerpo .= "Email: $email\n\n";
$cuerpo .= "Mensaje:\n$mensaje";

$enviado = $servicio->enviarCorreo(
    "destinatario@tuapp.com", // tu correo real donde recibes mensajes
    "Nuevo mensaje de contacto", // asunto
    $cuerpo // cuerpo completo
);

// 4. Respuesta
if ($enviado) {
    header('Location: index.php?success=1');
} else {
    header('Location: index.php?error=3');
}
exit;

?>