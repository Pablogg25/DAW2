<?php

require_once __DIR__ . "/configuracion.php";

require_once __DIR__ . "/../datos/ConexionBD.php";

require_once __DIR__ . "/../datos/ProductoPDODAO.php";
require_once __DIR__ . "/../datos/ProductoMemoriaDAO.php";

require_once __DIR__ . "/../negocio/ProductoService.php";

class Factoria
{
    public function crearProductoService(): ProductoService
    {
        if (TIPO_DAO === "MEMORIA") {

            $dao = new ProductoMemoriaDAO();

        } else {

            $conexion =
                ConexionBD::conectar();

            $dao = new ProductoPDODAO(
                $conexion
            );
        }

        return new ProductoService(
            $dao
        );
    }
}