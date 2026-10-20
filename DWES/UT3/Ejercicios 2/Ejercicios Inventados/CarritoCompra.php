<?php

declare(strict_types=1);

// 1. Función para agregar producto pasando el carrito POR REFERENCIA (&)
function agregarProducto(array &$carrito, string $nombre, float $precio, int $cantidad = 1): void
{
    $productoCarrito = [
        "nombre"   => $nombre,
        "precio"   => $precio,
        "cantidad" => $cantidad
    ];

    array_push($carrito, $productoCarrito);
}

// 2. Inicializamos el carrito y añadimos productos
$carrito = [];

agregarProducto($carrito, "Plátanos", 1.80, 2);
agregarProducto($carrito, "Manzanas", 2.25, 3);
agregarProducto($carrito, "Peras", 1.95, 4);
agregarProducto($carrito, "Melón", 3.50); // Usando el valor por defecto (cantidad = 1)


// 3. Función para calcular el total
// OPCIÓN A (Clásica con foreach):
function calcularTotal(array $carrito): float
{
    $total = 0.0;

    foreach ($carrito as $producto) {
        $total += $producto["precio"] * $producto["cantidad"];
    }

    return $total;
}

/*
// OPCIÓN B (Avanzada usando array_column + array_map + array_sum):
function calcularTotalAvanzado(array $carrito): float
{
    $precios    = array_column($carrito, 'precio');
    $cantidades = array_column($carrito, 'cantidad');

    // Multiplicamos cada precio por su cantidad
    $subtotales = array_map(fn(float $p, int $c) => $p * $c, $precios, $cantidades);

    return array_sum($subtotales);
}
*/

// 4. Imprimir el Ticket de compra
echo "<h2>--- TICKET DE COMPRA ---</h2>";
echo "<ul>";

foreach ($carrito as $item) {
    $subtotal = $item["precio"] * $item["cantidad"];
    // number_format() para mostrar siempre 2 decimales con coma o punto
    $subtotalFormateado = number_format($subtotal, 2);
    $precioUnitario = number_format($item["precio"], 2);

    echo "<li>{$item['cantidad']}x {$item['nombre']} ({$precioUnitario}€/ud) - <strong>{$subtotalFormateado}€</strong></li>";
}

echo "</ul>";

$totalCompra = calcularTotal($carrito);
echo "<p><strong>TOTAL: " . number_format($totalCompra, 2) . "€</strong></p>";
