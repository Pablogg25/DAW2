<?php
declare(strict_types=1);

class TallerController {
    private TallerService $service;
    private array $errores = [];
    private string $mensajeExito = '';
    private string $opcion = 'list_coches';

    public function __construct() {
        $this->service = new TallerService();
    }

    public function dispatch(): void {
        $this->opcion = Helper::sanearTexto($_GET['op'] ?? 'list_coches');

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion'])) {
            $this->procesarAccion(Helper::sanearTexto($_POST['accion']));
        }

        $this->render();
    }

    private function procesarAccion(string $accion): void {
        try {
            switch ($accion) {
                case 'add_cliente':
                    $nif = Helper::validarNif($_POST['nif'] ?? '');
                    $nombre = Helper::sanearTexto($_POST['nombre'] ?? '');
                    if (empty($nif) || empty($nombre)) {
                        throw new Exception("Todos los campos del cliente son obligatorios.");
                    }
                    $this->service->registrarCliente($nif, $nombre);
                    $this->mensajeExito = "Cliente guardado correctamente.";
                    break;

                case 'add_coche':
                    $matricula = Helper::validarMatricula($_POST['matricula'] ?? '');
                    $marca = Helper::sanearTexto($_POST['marca'] ?? '');
                    $modelo = Helper::sanearTexto($_POST['modelo'] ?? '');
                    $nifCliente = Helper::validarNif($_POST['nif_cliente'] ?? '');
                    if (empty($matricula) || empty($marca) || empty($modelo) || empty($nifCliente)) {
                        throw new Exception("Todos los campos del coche son obligatorios.");
                    }
                    $this->service->registrarCoche($matricula, $marca, $modelo, $nifCliente);
                    $this->mensajeExito = "Coche registrado correctamente.";
                    break;

                case 'add_averia':
                    $matricula = Helper::validarMatricula($_POST['matricula'] ?? '');
                    $averia = Helper::sanearTexto($_POST['averia'] ?? '');
                    if (empty($matricula) || empty($averia)) {
                        throw new Exception("Debe seleccionar un coche e indicar la avería.");
                    }
                    $this->service->registrarAveria($matricula, $averia);
                    $this->mensajeExito = "Avería añadida a la cola del taller.";
                    break;

                case 'reparar_coche':
                    $idReparacion = filter_input(INPUT_POST, 'id_reparacion', FILTER_VALIDATE_INT);
                    $trabajo = Helper::sanearTexto($_POST['trabajo'] ?? '');
                    $precio = Helper::validarPrecio($_POST['precio'] ?? '');
                    if (!$idReparacion || empty($trabajo) || $precio === false || $precio <= 0) {
                        throw new Exception("Debes rellenar los trabajos y un precio válido mayor a 0.");
                    }
                    $this->service->finalizarReparacion($idReparacion, $trabajo, $precio);
                    $this->mensajeExito = "Reparación finalizada y lista para facturación.";
                    break;
            }
        } catch (Exception $e) {
            $this->errores[] = $e->getMessage();
        }
    }

    private function render(): void {
        $taller = $this->service->getTaller();
        $op = $this->opcion;
        $errores = $this->errores;
        $mensajeExito = $this->mensajeExito;

        // Renderizado del layout principal SPA
        ?>
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Taller Mecánico</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
                .container { max-width: 1000px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                nav { display: flex; flex-wrap: wrap; gap: 8px; background: #333; padding: 10px; border-radius: 4px; margin-bottom: 20px; }
                nav a { color: white; text-decoration: none; padding: 8px 12px; background: #444; border-radius: 4px; font-size: 14px; }
                nav a:hover, nav a.active { background: #007bff; }
                .alert-error { color: #721c24; background: #f8d7da; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; margin-bottom: 15px; }
                .alert-exito { color: #155724; background: #d4edda; padding: 10px; border: 1px solid #c3e6cb; border-radius: 4px; margin-bottom: 15px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background: #007bff; color: white; }
                .factura-card { border: 1px solid #ccc; padding: 15px; background: #fafafa; border-left: 5px solid #007bff; margin-bottom: 15px; border-radius: 4px; }
                .precio-factura { font-size: 18px; color: #007bff; }
                .total-caja { background: #28a745; color: white; padding: 15px; font-size: 20px; text-align: right; border-radius: 4px; margin-top: 20px; }
            </style>
        </head>
        <body>
        <div class="container">
            <h1>Gestión de Taller Mecánico</h1>

            <nav>
                <a href="index.php?op=add_coche" class="<?= $op==='add_coche'?'active':'' ?>">Añadir Coche</a>
                <a href="index.php?op=list_coches" class="<?= $op==='list_coches'?'active':'' ?>">Listar Coches</a>
                <a href="index.php?op=add_cliente" class="<?= $op==='add_cliente'?'active':'' ?>">Añadir Cliente</a>
                <a href="index.php?op=list_clientes" class="<?= $op==='list_clientes'?'active':'' ?>">Listar Clientes</a>
                <a href="index.php?op=add_averia" class="<?= $op==='add_averia'?'active':'' ?>">Añadir Avería</a>
                <a href="index.php?op=reparar_coche" class="<?= $op==='reparar_coche'?'active':'' ?>">Reparar Coche</a>
                <a href="index.php?op=list_reparaciones" class="<?= $op==='list_reparaciones'?'active':'' ?>">Listar Reparaciones</a>
                <a href="index.php?op=list_facturas" class="<?= $op==='list_facturas'?'active':'' ?>">Listar Facturas</a>
            </nav>

            <?php if (!empty($errores)): ?>
                <div class="alert-error">
                    <ul>
                        <?php foreach ($errores as $err): ?>
                            <li><?= Helper::e($err) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <?php if ($mensajeExito): ?>
                <div class="alert-exito"><?= Helper::e($mensajeExito) ?></div>
            <?php endif; ?>

            <?php 
            if (str_starts_with($op, 'add_') || $op === 'reparar_coche') {
            include __DIR__ . '/../View/Formularios.php';
            } else {
            include __DIR__ . '/../View/Listados.php';
            }
            ?>
        </div>
        </body>
        </html>
        <?php
    }
}