<?php

// -------------------------------------------- TODO: require/s necesario/s

class ProductoMemoriaDAO // -----------------------TODO: implement/s necesario/s
{
    private array $productos = [];

    /** Último id asignado (simula el AUTO_INCREMENT de la BD) */
    private int $ultimoId = 0;

    // -------------------------------------------- TODO: firma del método para obtener todos los productos
    {
        return array_values($this->productos);
    }

    // ------------------------------------------- TODO: firma del método para obtener un producto por id
    {

        foreach ($this->productos as $producto) {

            if ($producto->id == $id) {
                return $producto;
            }

        }

        return null;
    }

    // ----------------------------------------- TODO: firma del método para insertar un producto
    {

        // Si no trae id (0), se le asigna el siguiente, como haría la BD
        if ($producto->id <= 0) {
            $producto->id = $this->ultimoId + 1;
        }

        $this->ultimoId = max($this->ultimoId, $producto->id);

        $this->productos[] = $producto;
    }

    // ----------------------------------------- TODO: firma del método para actualizar un producto
    {

        foreach ($this->productos as $i => $p) {

            if ($p->id == $producto->id) {

                $this->productos[$i] = $producto;
                return;
            }

        }
    }

    // ----------------------------------------- TODO: firma del método para borrar un producto 
    {

        $this->productos = array_filter(
            $this->productos,
            fn($p) => $p->id != $id
        );
    }

   /**
     * Reemplazo "transaccional" en memoria (Simulado):     
     * */
    // --------------------------------------- TODO: firma del método para reemplazar un producto por nombre
    {

        // COMENZAR TRANSACCIÓN SIMULADA: copia del estado (clonamos los objetos para que una
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

            // CONFIRMACIÓN DE TRANSACCIÓN: no hay que hacer nada, el estado ya es el definitivo

        } catch (Throwable $e) {

            // RECHAZO DE TRANSACCIÓN: se restaura el estado anterior
            $this->productos = $copiaProductos;
            $this->ultimoId = $copiaUltimoId;

            throw $e;
        }
    }
}