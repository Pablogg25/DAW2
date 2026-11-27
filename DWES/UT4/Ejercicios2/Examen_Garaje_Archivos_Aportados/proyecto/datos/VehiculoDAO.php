<?php

require_once __DIR__ . '/../entidades/Vehiculo.php';

interface VehiculoDAO
{
    public function listAll(): ?array;
    public function byId(int $id): ?Vehiculo;
    public function save(Vehiculo $vehiculo): ?Vehiculo;
    public function update(int $id, Vehiculo $vehiculo): ?Vehiculo;
    public function delete(int $id): ?Vehiculo;
    public function reemplazarVehiculo(string $nombreVehiculoViejo, string $nombreVehiculoNuevo, float $precio);
}
