<?php

require_once __DIR__ . '/../entidades/Producto.php';

/**
 * Toda la lógica de negocio y el acceso a datos (PDO) en una sola clase.
 */
class ProductoService
{
    private PDO $pdo;

    public function __construct()
    {
        // Conexión PDO (SQLite). Si el fichero no existe, se crea
        // la tabla y se cargan los datos iniciales.
        $ruta = __DIR__ . '/../productos.db';
        $bdNueva = !file_exists($ruta);

        $this->pdo = new PDO('sqlite:' . $ruta);
        $this->pdo->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );

        if ($bdNueva) {
            $this->pdo->exec(
                'CREATE TABLE productos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    precio REAL NOT NULL
                )'
            );

            $this->pdo->exec(
                "INSERT INTO productos(nombre, precio)
                 VALUES ('Teclado', 20), ('Ratón', 10)"
            );
        }
    }

    public function obtenerProductos(): array
    {
        $filas = $this
            ->pdo
            ->query('SELECT id, nombre, precio FROM productos')
            ->fetchAll(PDO::FETCH_ASSOC);

        $productos = [];

        foreach ($filas as $fila) {
            $productos[] = new Producto(
                (int) $fila['id'],
                $fila['nombre'],
                (float) $fila['precio']
            );
        }

        return $productos;
    }

    public function altaProducto(Producto $producto): void
    {
        $consulta = $this->pdo->prepare(
            'INSERT INTO productos(nombre, precio)
             VALUES (?, ?)'
        );

        $consulta->execute([
            $producto->nombre,
            $producto->precio
        ]);
    }

    public function actualizarProducto(Producto $producto): void
    {
        $consulta = $this->pdo->prepare(
            'UPDATE productos
             SET nombre = ?, precio = ?
             WHERE id = ?'
        );

        $consulta->execute([
            $producto->nombre,
            $producto->precio,
            $producto->id
        ]);
    }

    public function borrarProducto(int $id): void
    {
        $consulta = $this->pdo->prepare(
            'DELETE FROM productos
             WHERE id = ?'
        );

        $consulta->execute([$id]);
    }

    /**
     * Reemplaza un producto (borrar + insertar) en UNA transacción.
     * Si algo falla (incluido que el producto antiguo no exista):
     * rollback y se relanza la excepción.
     */
    public function reemplazarProducto(
        string $nombreAntiguo,
        string $nombreNuevo,
        float $precio
    ): void {
        $this->pdo->beginTransaction();

        try {
            // 1) Eliminar el producto antiguo
            $borrado = $this->pdo->prepare(
                'DELETE FROM productos
                 WHERE nombre = ?'
            );

            $borrado->execute([$nombreAntiguo]);

            if ($borrado->rowCount() === 0) {
                throw new Exception(
                    'No existe el producto a sustituir'
                );
            }

            // 2) Insertar el producto nuevo
            $insercion = $this->pdo->prepare(
                'INSERT INTO productos(nombre, precio)
                 VALUES (?, ?)'
            );

            $insercion->execute([$nombreNuevo, $precio]);

            // Todo correcto -> confirmar
            $this->pdo->commit();
        } catch (Throwable $e) {
            // Cualquier fallo -> deshacer todo
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }

            throw $e;
        }
    }
}
