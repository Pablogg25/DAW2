<?php
require_once __DIR__ . '/ConexionBD.php';
require_once __DIR__ . '/dao/CuentaDAO.php';
require_once __DIR__ . '/dao/CuentaPDODAO.php';
require_once __DIR__ . '/dao/CuentaDAOLog.php';
require_once __DIR__ . '/services/CuentaService.php';

class FactoriaAplicacion
{
    public function crearCuentaService(): CuentaService
    {
        $conexion = ConexionBD::conectar();
        $daoReal = new CuentaPDODAO($conexion);
        $daoConLog = new CuentaDAOLog($daoReal, __DIR__ . '/../../log.txt');
        return new CuentaService($daoConLog);
    }
}
