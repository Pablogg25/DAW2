<?php


function conjugar($final)
{
    $verbos = ["Hablar", "Comer", "Reir"];

    foreach ($verbos as $verbo) {
        $terminacion = substr(strtolower($verbo), -2); // Obtener las dos últimas letras

        if ($terminacion == $final) {
            switch ($final) {
                case "ar":
                    echo "Yo hablo, Tú hablas, Él habla\n";
                    break;
                case "er":
                    echo "Yo como, Tú comes, Él come\n";
                    break;
                case "ir":
                    echo "Yo río, Tú ríes, Él ríe\n";
                    break;
            }
        }
    }
}

$final = "ar";
conjugar($final);
