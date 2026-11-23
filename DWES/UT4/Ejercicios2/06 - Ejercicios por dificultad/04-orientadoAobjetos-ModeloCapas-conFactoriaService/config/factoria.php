<?php

require_once __DIR__ . "/configuracion.php";

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

            $dao = new ProductoPDODAO();

        }

        return new ProductoService($dao);
    }
}
