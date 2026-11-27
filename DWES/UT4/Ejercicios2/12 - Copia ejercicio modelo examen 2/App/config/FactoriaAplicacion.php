<?php
require_once __DIR__ . '/../datos/ConexionBD.php';
require_once __DIR__ . '/../datos/MotoPDODAO.php';
require_once __DIR__ . '/../datos/MotoDAOLog.php';
require_once __DIR__ . '/../negocio/MotoService.php';

class FactoriaAplicacion
{
    public static function crearServicioFactoria(): ?MotoService
    {
        $conexion = ConexionBD::conectar();
        $dao = new MotoPDODAO($conexion);
        $dao = new MotoDAOLog($dao);
        return new MotoService($dao);
    }
}
