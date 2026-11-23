<?php

require_once __DIR__
    . "/ConexionBD.php";

require_once __DIR__
    . "/dao/PeliculaDAO.php";

require_once __DIR__
    . "/dao/PeliculaPDODAO.php";

require_once __DIR__
    . "/dao/PeliculaDAOLog.php";

require_once __DIR__
    . "/services/PeliculaService.php";

class FactoriaAplicacion
{
    public function crearPeliculaService()
    {
        $conexion =
            ConexionBD::conectar();

        $dao =
            new PeliculaPDODAO(
                $conexion
            );

        $dao =
            new PeliculaDAOLog(
                $dao
            );

        return new PeliculaService(
            $dao
        );
    }
}