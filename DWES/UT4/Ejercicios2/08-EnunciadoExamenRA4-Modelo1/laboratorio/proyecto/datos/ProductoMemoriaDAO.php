<?php
require_once __DIR__ . '/ProductoDAO.php';
require_once __DIR__ . '/../entidades/Producto.php';

class ProductoMemoriaDAO implements ProductoDAO
{
    /** @var Producto[] */
    private array $productos = [];
    private int $siguienteId = 1;

    public function __construct()
    {
        $this->insertar(new Producto(null, 'Teclado', 20.00));
        $this->insertar(new Producto(null, 'Ratón', 10.00));
        $this->insertar(new Producto(null, 'Monitor 24"', 145.50));
    }

    public function obtenerTodos(): array
    {
        return array_values($this->productos);
    }

    public function obtenerPorId(int $id): ?Producto
    {
        return $this->productos[$id] ?? null;
    }

    public function insertar(Producto $producto): void
    {
        $id = $this->siguienteId++;
        $producto->id = $id;
        $this->productos[$id] = $producto;
    }

    public function actualizar(Producto $producto): void
    {
        if ($producto->id === null || !isset($this->productos[$producto->id])) {
            throw new RuntimeException('No existe el producto que se intenta actualizar.');
        }
        $this->productos[$producto->id] = $producto;
    }

    public function borrar(int $id): void
    {
        if (!isset($this->productos[$id])) {
            throw new RuntimeException("No existe ningún producto con ID {$id}.");
        }
        unset($this->productos[$id]);
    }

    public function reemplazarProducto(string $nombreAntiguo, string $nombreNuevo, float $precioNuevo): void
    {
        $copiaSeguridad = $this->productos;

        try {
            $idEncontrado = null;
            foreach ($this->productos as $id => $producto) {
                if (mb_strtolower(trim($producto->nombre)) === mb_strtolower(trim($nombreAntiguo))) {
                    $idEncontrado = $id;
                    break;
                }
            }

            if ($idEncontrado === null) {
                throw new RuntimeException("No se encontró el producto '{$nombreAntiguo}' para reemplazar.");
            }

            // 1. Eliminar el producto antiguo
            $this->borrar($idEncontrado);

            // 2. Insertar el nuevo producto
            $this->insertar(new Producto(null, $nombreNuevo, $precioNuevo));
        } catch (Throwable $e) {
            $this->productos = $copiaSeguridad;
            throw $e;
        }
    }
}
?>