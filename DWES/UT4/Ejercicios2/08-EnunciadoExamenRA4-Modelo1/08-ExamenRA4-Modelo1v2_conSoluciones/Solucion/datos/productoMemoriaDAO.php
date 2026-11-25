<?php

require_once __DIR__ . "/../datos/productoDAO.php";

class ProductoMemoriaDAO
    implements ProductoDAO
{
    private array $productos = [];

    /** Último id asignado (simula el AUTO_INCREMENT de la BD) */
    private int $ultimoId = 0;

    public function obtenerTodos(): array
    {
        return array_values($this->productos);
    }

    public function obtenerPorId(
        int $id
    ): ?Producto {

        foreach ($this->productos as $producto) {

            if ($producto->id == $id) {
                return $producto;
            }

        }

        return null;
    }

    public function insertar(
        Producto $producto
    ): void {

        // Si no trae id (0), se le asigna el siguiente, como haría la BD
        if ($producto->id <= 0) {
            $producto->id = $this->ultimoId + 1;
        }

        $this->ultimoId = max($this->ultimoId, $producto->id);

        $this->productos[] = $producto;
    }

    public function actualizar(
        Producto $producto
    ): void {

        foreach ($this->productos as $i => $p) {

            if ($p->id == $producto->id) {

                $this->productos[$i] = $producto;
                return;
            }

        }
    }

    public function borrar(
        int $id
    ): void {

        $this->productos = array_filter(
            $this->productos,
            fn($p) => $p->id != $id
        );
    }

    /**
     * Reemplazo "transaccional" en memoria:
     * se guarda una copia del estado antes de empezar (equivale al
     * BEGIN); si algo falla se restaura (ROLLBACK) y si todo va bien
     * simplemente se conservan los cambios (COMMIT).
     */
    public function reemplazarProducto(
        string $nombreAntiguo,
        Producto $nuevo
    ): void {

        // BEGIN: copia del estado (clonamos los objetos para que una
        // modificación posterior no altere la copia de seguridad)
        $copiaProductos = array_map(
            fn($p) => clone $p,
            $this->productos
        );
        $copiaUltimoId = $this->ultimoId;

        try {

            // 1) Eliminar el producto antiguo
            $antes = count($this->productos);

            $this->productos = array_filter(
                $this->productos,
                fn($p) => $p->nombre !== $nombreAntiguo
            );

            if (count($this->productos) === $antes) {

                throw new RuntimeException(
                    "No existe ningún producto con nombre '"
                    . $nombreAntiguo
                    . "'"
                );
            }

            // 2) Insertar el producto nuevo
            $this->insertar($nuevo);

            // COMMIT: no hay que hacer nada, el estado ya es el definitivo

        } catch (Throwable $e) {

            // ROLLBACK: se restaura el estado anterior
            $this->productos = $copiaProductos;
            $this->ultimoId = $copiaUltimoId;

            throw $e;
        }
    }
}