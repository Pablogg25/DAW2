<?php

require_once __DIR__ . "/config/configuracion.php";

if (TIPO_DAL === "MEMORIA") {

    require_once __DIR__ . "/producto_memoria.php";

} else {

    require_once __DIR__ . "/producto_pdo.php";

}