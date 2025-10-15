<?php
$productos = [
    "Manzana" => 5,
    "Plátano" => 3,
    "Naranja" => 4,
    "Kiwi" => 6
];

$compra = [
    "Manzana" => 2,      // 2 kg de manzanas
    "Plátano" => 1.5,    // 1.5 kg de plátanos
    "Naranja" => 5       // 5 kg de naranjas
];

$total = 0;

foreach ($compra as $fruta => $kilos) {
    if (isset($productos[$fruta])) {
        $subtotal = $productos[$fruta] * $kilos;
        echo "$fruta: $kilos kg x {$productos[$fruta]} €/kg = $subtotal €<br>";
        $total += $subtotal;
    }
}

echo "<strong>Total: $total €</strong>";
