<?php
require_once __DIR__ . '/../datos/ProductoDAO.php';

class ProductoService
{
    private ProductoDAO $dao;

    public function __construct(ProductoDAO $dao)
    {
        $this->dao = $dao;
    }

    public function listAll(): ?array
    {
        // VALIDO DATOS SI ES NECESARIO
        return $this->dao->listAll();
    }

    public function byId(int $id): ?Producto
    {
        // VALIDO DATOS SI ES NECESARIO
        return $this->dao->byId($id);
    }

    public function save(Producto $producto): ?Producto
    {
        return $this->dao->save($producto);
    }

    public function update(int $id, Producto $producto): ?Producto
    {
        return $this->dao->update($id, $producto);
    }

    public function delete(int $id): ?Producto
    {
        return $this->dao->delete($id);
    }

    public function reemplazarProducto(
        string $nombreProducto,
        string $nombreNuevoProducto,
        float $precioNuevoProducto
    ): ?Producto {
        return $this->dao->reemplazarProducto($nombreProducto, $nombreNuevoProducto, $precioNuevoProducto);
    }
}
?>