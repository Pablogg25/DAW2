<?php
// Crea un archivo de base de datos local en la misma carpeta
$pdo = new PDO('sqlite:datos.db');

// Configura PDO para que muestre errores si algo falla
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Crea una tabla e inserta un registro de forma segura
$pdo->exec("CREATE TABLE IF NOT EXISTS tareas (id INTEGER PRIMARY KEY, titulo TEXT)");

$stmt = $pdo->prepare("INSERT INTO tareas (titulo) VALUES (:titulo)");
$stmt->execute([':titulo' => 'Probar SQLite con PHP sin instalar nada']);

// Lee los datos guardados
$tareas = $pdo->query("SELECT * FROM tareas")->fetchAll(PDO::FETCH_ASSOC);
print_r($tareas);
