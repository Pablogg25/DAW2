<?php

// -------------------------------------------- TODO: require/s necesario/s
require_once __DIR__ . '/../datos/VehiculoDAO.php';

class VehiculoMemoriaDAO implements VehiculoDAO  // -----------------------TODO: implement/s necesario/s
{
    private array $vehiculos = [];

    /**
     * Último id asignado (simula el AUTO_INCREMENT de la BD)
     */
    private int $ultimoId = 0;

    public function listAll(): ?array
    {
        return array_values($this->vehiculos);
    }

    public function byId(int $id): ?Vehiculo
    {
        foreach ($this->vehiculos as $vehiculo) {
            if ($vehiculo->id == $id) {
                return $vehiculo;
            }
        }

        return null;
    }

    public function save(Vehiculo $vehiculo): ?Vehiculo
    {
        // Si no trae id (0), se le asigna el siguiente, como haría la BD
        if ($vehiculo->id <= 0) {
            $vehiculo->id = $this->ultimoId + 1;
        }

        $this->ultimoId = max($this->ultimoId, $vehiculo->id);

        $this->vehiculos[] = $vehiculo;
    }

    public function update(int $id, Vehiculo $vehiculo): ?Vehiculo
    {
        foreach ($this->vehiculos as $i => $p) {
            if ($p->id == $vehiculo->id) {
                $this->vehiculos[$i] = $vehiculo;
                return;
            }
        }
    }

    public function delete(int $id): ?Vehiculo
    {
        $this->vehiculos = array_filter(
            $this->vehiculos,
            fn($p) => $p->id != $id
        );
    }

    /**
     * Reemplazo "transaccional" en memoria (Simulado):
     */
    public function reemplazarVehiculo(string $nombreAntiguo, string $nombreVehiculoNuevo, float $precio) {}

    /*{
        // COMENZAR TRANSACCIÓN SIMULADA: copia del estado (clonamos los objetos para que una
        // modificación posterior no altere la copia de seguridad)
        $copiaVehiculos = array_map(
            fn($p) => clone $p,
            $this->vehiculos
        );
        $copiaUltimoId = $this->ultimoId;

        try {
            // 1) Eliminar el vehículo antiguo
            $antes = count($this->vehiculos);

            $this->vehiculos = array_filter(
                $this->vehiculos,
                fn($p) => $p->nombre !== $nombreAntiguo
            );

            if (count($this->vehiculos) === $antes) {
                throw new RuntimeException(
                    "No existe ningún vehículo con nombre '"
                    . $nombreAntiguo
                    . "'"
                );
            }

            // 2) Insertar el vehículo nuevo
            $this->insertar($nuevo);

            // CONFIRMACIÓN DE TRANSACCIÓN: no hay que hacer nada, el estado ya es el definitivo
        } catch (Throwable $e) {
            // RECHAZO DE TRANSACCIÓN: se restaura el estado anterior
            $this->vehiculos = $copiaVehiculos;
            $this->ultimoId = $copiaUltimoId;

            throw $e;
        }
    }*/
}
