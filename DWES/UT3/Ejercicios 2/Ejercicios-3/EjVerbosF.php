<?php
$sujeto = ["Yo", "Tu", "El", "Nosotros", "Vosotros", "Ellos"];
$verbos = ["Hablar", "Comer", "Reir"];
$conjugaciones = [
    "ar" => ["o", "as", "a", "amos", "ais", "an"],
    "er" => ["o", "es", "e", "emo", "eis", "en"],
    "ir" => ["o", "es", "e", "imos", "is", "en"]
];

foreach ($verbos as $verbo) {
    $terminacion = substr(strtolower($verbo), -2); // "ar", "er", "ir"
    $raiz = substr(strtolower($verbo), 0, -2);     // "habl", "com", "re"

    if (isset($conjugaciones[$terminacion])) {
        echo "Conjugación de $verbo:\n";
        foreach ($sujeto as $i => $persona) {
            echo "$persona " . $raiz . $conjugaciones[$terminacion][$i] . "\n";
        }
        echo "\n";
    }
}
