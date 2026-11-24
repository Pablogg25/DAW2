<?php
require_once __DIR__.'/../negocio/ProductoService.php';
require_once __DIR__.'/../datos/ConexionBD.php';
require_once __DIR__.'/../datos/ProductoPDODAO.php';
require_once __DIR__.'/../datos/ProductoDAOLog.php';

class FactoriaAplicacion{

    public static function getService():?UbicacionService{
        $conexion=ConexionBD::getConexion();
        $dao=new ProductoPDODAO($conexion);
        $dao=new ProductoDAOLog($dao);
        return new ProductoService($dao);
    }

}

?>