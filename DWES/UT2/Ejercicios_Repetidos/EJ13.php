<?php
$fecha = date_default_timezone_set("Europe/Madrid");
echo "Fecha actual: " . $fecha["mday"] . "/" . $fecha["mon"] . "/" . $fecha["year"] . "<br>";
echo "Hora actual: " . $fecha["hours"] . ":" . $fecha["minutes"] . ":" . $fecha["seconds"];
