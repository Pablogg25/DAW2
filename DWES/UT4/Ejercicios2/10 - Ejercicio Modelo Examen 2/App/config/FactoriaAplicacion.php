<?php
require_once __DIR__ .'/../datos/ConexionBD.php';
require_once __DIR__ .'/../datos/MotoDAO.php';
require_once __DIR__ .'/../datos/MotoPDODAO.php';
require_once __DIR__ . '/../negocio/MotoService.php';

class FactoriaAplicacion{
    public function crearMotoService(): MotoService{
        $conexion = ConexionBD::conectar();
        $daoReal = new MotoPDODAO($conexion);
        return new MotoService($daoReal);
    }
}