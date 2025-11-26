<?php

namespace App\Clases;

use App\Interfaces\InterfazProveedorCorreo;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class ProveedorMailtrap implements InterfazProveedorCorreo
{
    public function enviarCorreo(string $paraQuien, string $asunto, string $cuerpoMensaje): bool
    {
        $mail = new PHPMailer(true);

        try {

            // Configuración SMTP proporcionada por Mailtrap
            $mail->isSMTP();
            $mail->Host = 'sandbox.smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Port = 2525;

            // TUS CREDENCIALES DE MAILTRAP (SMTP)
            $mail->Username = '386d560b0ed3fe';
            $mail->Password = '775355d2654c9c';

            // Configurar remitente y destinatario
            $mail->setFrom('noreply@tuapp.com', 'Formulario Web');
            $mail->addAddress($paraQuien);

            // Contenido del correo
            $mail->isHTML(true);
            $mail->Subject = $asunto;
            $mail->Body = nl2br($cuerpoMensaje);
            $mail->AltBody = $cuerpoMensaje;

            $mail->send();
            return true;

        } catch (Exception $e) {
            return false;
        }
    }
}
