<?php
require_once __DIR__ . '/../datos/ComponenteDAO.php';
require_once __DIR__ . '/../datos/ComponentePDODAO.php';
require_once __DIR__ . '/../datos/ConexionBD.php';
require_once __DIR__ . '/../negocio/ComponenteService.php';
require_once __DIR__ . '/../datos/ComponenteDAOLog.php';

class FactoriaAplicacion
{
    public static function crearComponenteService(): ?ComponenteService
    {
        $conexion = ConexionBD::conectar();
        $dao = new ComponentePDODAO($conexion);
        $dao = new ComponenteDAOLog($dao);
        return new ComponenteService($dao);
    }
}
