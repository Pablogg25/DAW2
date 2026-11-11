<?php
// 1. Conexión directa a la base de datos
$pdo = obtenerConexion();

echo "<h1>Script Automático Super Simplificado</h1>";

// 2. Limpiar la tabla
$pdo->exec("TRUNCATE TABLE animales");
echo "<p>1. Tabla vaciada.</p>";

// 3. Insertar datos directamente (sin prepare)
$pdo->exec("INSERT INTO animales (nombre, edad, especie) VALUES ('Simba', 4, 'León')");
$pdo->exec("INSERT INTO animales (nombre, edad, especie) VALUES ('Firulais', 2, 'Perro')");
$pdo->exec("INSERT INTO animales (nombre, edad, especie) VALUES ('Nemo', 1, 'Pez')");
echo "<p>2. Tres animales insertados (Simba, Firulais, Nemo).</p>";

// 4. Mostrar datos actuales
echo "<h3>Animales en la base de datos:</h3>";
$datos = $pdo->query("SELECT * FROM animales");
foreach ($datos as $fila) {
    echo "ID: " . $fila['id'] . " | Nombre: " . $fila['nombre'] . " | Especie: " . $fila['especie'] . " | Edad: " . $fila['edad'] . "<br>";
}

// 5. Actualizar (sin prepare)
$pdo->exec("UPDATE animales SET edad = 3 WHERE nombre = 'Firulais'");
echo "<p>3. Edad de Firulais actualizada a 3 años.</p>";

// 6. Borrar (sin prepare)
$pdo->exec("DELETE FROM animales WHERE nombre = 'Nemo'");
echo "<p>4. Nemo borrado de la base de datos.</p>";

// 7. Mostrar resultado final
echo "<h3>Resultado final:</h3>";
$datosFinales = $pdo->query("SELECT * FROM animales");
foreach ($datosFinales as $fila) {
    echo "ID: " . $fila['id'] . " | Nombre: " . $fila['nombre'] . " | Especie: " . $fila['especie'] . " | Edad: " . $fila['edad'] . "<br>";
}
?>