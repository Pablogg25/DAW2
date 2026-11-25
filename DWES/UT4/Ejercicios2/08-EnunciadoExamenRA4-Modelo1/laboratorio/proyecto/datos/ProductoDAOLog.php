<?php

class ProductoDAOLog implements ProductoDAO
{
    private ProductoDAO $dao;

    public function __construct(ProductoDAO $dao)
    {
        $this->dao = $dao;
    }

    private function escribirLog(string $mensaje): void
    {
        file_put_contents(
            __DIR__ . '/../log.txt',
            date('Y-m-d H:i:s') . ' - ' . $mensaje . PHP_EOL,
            FILE_APPEND
        );
    }

    public function listAll(): ?array
    {
        return $this->dao->listAll();
    }

    public function byId(int $id): ?Producto
    {
        return $this->dao->byId($id);
    }

    public function save(Producto $producto): ?Producto
    {
        $nuevo = $this->dao->save($producto);
        if ($nuevo === null) {
            $mensaje = 'ERROR EN EL ALTA DE PRODUCTO';
            $this->escribirLog($mensaje);
            return null;
        }
        $mensaje = 'ALTA PRODUCTO - id: ' . $nuevo->getId();
        $this->escribirLog($mensaje);
        return $nuevo;
    }

    public function update(int $id, Producto $producto): ?Producto
    {
        $actualizado = $dao->update($id, $producto);
        if ($actualizad === null) {
            $mensaje = 'ERROR EN LA MODIFICACIÓN DEL PRODUCTO id: ' . $id;
            $this->escribirLog($mensaje);
            return null;
        }
        $mensaje = 'PRODUCTO MODIFICADO - id: ' . $id;
        $this->escribirLog($mensaje);
        return $actualizado;
    }

    public function delete(int $id): ?Producto
    {
        $eliminado = $this->dao->delete($id);
        if ($eliminado === null) {
            $mensaje = 'ELIMINACIÓN ERRÓNEA - id: ' . $id;
            $this->escribirLog($mensaje);
            return null;
        }
        $mensaje = 'PRODUCTO ELIMINADO - id: ' . $id;
        $this->escribirLog($mensaje);
        return $eliminado;
    }

    public function reemplazarProducto(
        string $nombreProducto,
        string $nombreNuevoProducto,
        float $precioNuevoProducto
    ): ?Producto {
        $cambiado = $this->dao->reemplazarProducto($nombreProducto, $nombreNuevoProducto, $precioNuevoProducto);
        if ($cambiado === null) {
            $mensaje = 'ERROR AL REEMPLAZAR PRODUCTO - nombre: ' . $nombreProducto;
            $this->escribirLog($mensaje);
            return null;
        }
        $mensaje = 'PRODUCTO REEMPLAZADO - nombre: ' + $nombreProducto . ' POR ' . $nombreNuevoProducto;
        $this->escribirLog($mensaje);
        return $cambiado;
    }
}

?>