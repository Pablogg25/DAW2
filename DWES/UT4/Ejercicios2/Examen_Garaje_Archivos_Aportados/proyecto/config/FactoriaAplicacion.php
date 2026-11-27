<?php
require_once __DIR__ . '/../datos/ConexionDB.php';
require_once __DIR__ . '/../datos/VehiculoDAO.php';
require_once __DIR__ . '/../datos/VehiculoPDODAO.php';
require_once __DIR__ . '/../negocio/VehiculoService.php';
require_once __DIR__ . '/../datos/VehiculoDAOLog.php';

class FactoriaAplicacion
{
    public static function crearServicio(): ?VehiculoService
    {
        $conexion = ConexionDB::conectar();
        $dao = new VehiculoPDODAO($conexion);
        $daoLog = new VehiculoDAOLog($dao);
        return new VehiculoService($daoLog);
    }
}
