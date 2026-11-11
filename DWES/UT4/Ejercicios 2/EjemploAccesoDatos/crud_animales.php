<?php
// =========================================================================
// 1. CONFIGURACIÓN DE BASE DE DATOS (PDO)
// =========================================================================
$host = 'localhost:3306';
$dbname = 'veterinaria';
$user = 'root'; // Cambia por tu usuario de BD
$pass = 'r00tMy$ql';     // Cambia por tu contraseña de BD

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    //$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión a la base de datos: " . $e->getMessage());
}

// =========================================================================
// 3. LÓGICA CRUD (Crear, Actualizar, Borrar)
// =========================================================================
$mensaje = '';

// Procesar Formulario (Crear o Editar)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'] ?? '';
    $nombre = trim($_POST['nombre'] ?? '');
    $edad = (int)($_POST['edad'] ?? 0);
    $especie = trim($_POST['especie'] ?? '');

    if (!empty($nombre) && !empty($especie)) {
        if ($id) {
            // Actualizar
            $stmt = $pdo->prepare("UPDATE animales SET nombre = ?, edad = ?, especie = ? WHERE id = ?");
            $stmt->execute([$nombre, $edad, $especie, $id]);
            $mensaje = "Animal actualizado correctamente.";
        } else {
            // Crear
            $stmt = $pdo->prepare("INSERT INTO animales (nombre, edad, especie) VALUES (?, ?, ?)");
            $stmt->execute([$nombre, $edad, $especie]);
            $mensaje = "Animal registrado correctamente.";
        }
    } else {
        $mensaje = "El nombre y la especie son obligatorios.";
    }
}

// Borrar
if (isset($_GET['accion']) && $_GET['accion'] == 'borrar' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("DELETE FROM animales WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    header("Location: crud_animales.php");
    exit;
}

// Cargar datos para el formulario de edición
$animalEdit = null;
if (isset($_GET['accion']) && $_GET['accion'] == 'editar' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM animales WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    $animalEdit = $stmt->fetch(PDO::FETCH_ASSOC);
}

// Obtener todos los registros para la tabla
$animales = $pdo->query("SELECT * FROM animales ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>CRUD Animales con PDF</title>
    <!-- Usamos Bootstrap para dar un estilo rápido y limpio -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-5">
    <h2 class="mb-4">Gestión de Animales</h2>

    <?php if ($mensaje): ?>
        <div class="alert alert-info"><?= htmlspecialchars($mensaje) ?></div>
    <?php endif; ?>

    <div class="row">
        <!-- =========================================================== -->
        <!-- FORMULARIO (Crear / Editar)                                 -->
        <!-- =========================================================== -->
        <div class="col-md-4">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <?= $animalEdit ? 'Editar Animal' : 'Nuevo Animal' ?>
                </div>
                <div class="card-body">
                    <form action="crud_animales.php" method="POST">
                        <input type="hidden" name="id" value="<?= $animalEdit['id'] ?? '' ?>">
                        
                        <div class="mb-3">
                            <label>Nombre</label>
                            <input type="text" name="nombre" class="form-control" required 
                                   value="<?= htmlspecialchars($animalEdit['nombre'] ?? '') ?>">
                        </div>
                        
                        <div class="mb-3">
                            <label>Especie</label>
                            <input type="text" name="especie" class="form-control" required
                                   value="<?= htmlspecialchars($animalEdit['especie'] ?? '') ?>">
                        </div>
                        
                        <div class="mb-3">
                            <label>Edad (Años)</label>
                            <input type="number" name="edad" class="form-control" required min="0"
                                   value="<?= htmlspecialchars($animalEdit['edad'] ?? '') ?>">
                        </div>
                        
                        <button type="submit" class="btn <?= $animalEdit ? 'btn-success' : 'btn-primary' ?> w-100">
                            <?= $animalEdit ? 'Actualizar' : 'Guardar' ?>
                        </button>
                        
                        <?php if ($animalEdit): ?>
                            <a href="crud_animales.php" class="btn btn-secondary w-100 mt-2">Cancelar</a>
                        <?php endif; ?>
                    </form>
                </div>
            </div>
        </div>

        <!-- =========================================================== -->
        <!-- TABLA DE LECTURA (Leer / Borrar / Exportar)                 -->
        <!-- =========================================================== -->
        <div class="col-md-8">
            <div class="d-flex justify-content-between mb-2">
                <h4>Listado Registrado</h4>
            </div>
            
            <table class="table table-bordered table-striped bg-white shadow-sm">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (count($animales) > 0): ?>
                        <?php foreach ($animales as $a): ?>
                            <tr>
                                <td><?= htmlspecialchars($a['id']) ?></td>
                                <td><?= htmlspecialchars($a['nombre']) ?></td>
                                <td><?= htmlspecialchars($a['especie']) ?></td>
                                <td><?= htmlspecialchars($a['edad']) ?></td>
                                <td>
                                    <a href="crud_animales.php?accion=editar&id=<?= $a['id'] ?>" class="btn btn-sm btn-warning">Editar</a>
                                    <a href="crud_animales.php?accion=borrar&id=<?= $a['id'] ?>" class="btn btn-sm btn-danger" 
                                       onclick="return confirm('¿Seguro que deseas borrar este registro?');">Borrar</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr><td colspan="5" class="text-center">No hay animales registrados.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
</html>