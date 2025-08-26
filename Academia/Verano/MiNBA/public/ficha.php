<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Repositorio\EquipoRepo;

if (isset($_GET["nombre"]))
    $nombre = $_GET["nombre"];
else
    $nombre = "";

$equipoRepo = new EquipoRepo();
$equipo = $equipoRepo->porNombre($nombre);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha de <?php echo htmlspecialchars($equipo ? $equipo->getNombre() : 'Equipo'); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #17408B 0%, #C9082A 100%);
            min-height: 100vh;
        }
        .nba-card {
            background: rgba(255,255,255,0.97);
            border-top: 5px solid #17408B;
            border-bottom: 5px solid #C9082A;
            margin-top: 80px;
        }
        .nba-section-title {
            color: #C9082A;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="container d-flex justify-content-center align-items-center" style="min-height:80vh;">
        <div class="nba-card card shadow-lg p-4" style="max-width: 500px; width: 100%;">
            <h2 class="nba-section-title text-center mb-4">Ficha de Equipo</h2>
            <?php if ($equipo): ?>
                <form method="post" action="procesa.php?modo=modifica&nombre=<?php echo urlencode($equipo->getNombre()); ?>">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre del equipo</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" value="<?php echo htmlspecialchars($equipo->getNombre()); ?>" required>
                    </div>
                    <div class="mb-3">
                        <label for="ciudad" class="form-label">Ciudad</label>
                        <input type="text" class="form-control" id="ciudad" name="ciudad" value="<?php echo htmlspecialchars($equipo->getCiudad()); ?>" required>
                    </div>
                    <div class="mb-3">
                        <label for="conferencia" class="form-label">Conferencia</label>
                        <input type="text" class="form-control" id="conferencia" name="conferencia" value="<?php echo htmlspecialchars($equipo->getConferencia()); ?>" required>
                    </div>
                    <div class="mb-3">
                        <label for="division" class="form-label">División</label>
                        <input type="text" class="form-control" id="division" name="division" value="<?php echo htmlspecialchars($equipo->getDivision()); ?>" required>
                    </div>
                    <div class="d-flex justify-content-between">
                        <input type="submit" class="btn btn-success" value="Modificar">
                        <a href="index.php?m=listar" class="btn btn-primary">Volver</a>
                    </div>
                </form>
            <?php else: ?>
                <div class="alert alert-danger text-center">
                    Equipo no encontrado.
                </div>
                <div class="text-center">
                    <a href="index.php?m=listar" class="btn btn-primary">Volver</a>
                </div>
            <?php endif; ?>
        </div>
    </div>