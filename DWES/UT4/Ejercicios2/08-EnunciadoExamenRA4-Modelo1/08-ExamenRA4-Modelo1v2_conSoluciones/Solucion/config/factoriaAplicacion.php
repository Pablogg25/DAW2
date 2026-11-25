<?php

require_once __DIR__ . "/configuracion.php";

require_once __DIR__ . "/../datos/conexionBD.php";

require_once __DIR__ . "/../datos/productoPDODAO.php";
require_once __DIR__ . "/../datos/productoMemoriaDAO.php";

require_once __DIR__ . "/../datos/productoDAOLog.php";

require_once __DIR__ . "/../negocio/productoService.php";

class FactoriaAplicacion
{
    public function crearProductoService(): ProductoService
    {
        require __DIR__ . "/configuracion.php";

        if ($tipoDAO === "MEMORIA") {

            $dao = new ProductoMemoriaDAO();

        } else {

            $conexion =
                ConexionBD::conectar();

            $dao = new ProductoPDODAO(
                $conexion
            );
        }

        /*
         * Decorador
         */
        $dao = new ProductoDAOLog(
            $dao
        );

        return new ProductoService(
            $dao
        );
    }
}