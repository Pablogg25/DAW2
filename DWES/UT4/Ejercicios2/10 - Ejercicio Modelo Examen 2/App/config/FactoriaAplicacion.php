<?php
require_once __DIR__ .'/../datos/ConexionBD.php';
require_once __DIR__ .'/../datos/MotoDAO.php';
require_once __DIR__ .'/../datos/MotoPDODAO.php';
require_once __DIR__ . '/../negocio/MotoService.php';
require_once __DIR__ . '/../datos/MotoDAOLog.php';

class FactoriaAplicacion{
    public function crearMotoService(): MotoService{
        $conexion = ConexionBD::conectar();
        $daoReal = new MotoPDODAO($conexion);
        $daoLog = new MotoDAOLog($daoReal);
        return new MotoService($daoLog);
    }
}