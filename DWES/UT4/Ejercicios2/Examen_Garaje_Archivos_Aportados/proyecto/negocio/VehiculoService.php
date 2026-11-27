<?php

require_once __DIR__ . '/../datos/VehiculoDAO.php';

class VehiculoService implements VehiculoDAO
{
    private VehiculoDAO $dao;

    public function __construct(VehiculoDAO $vehiculoDAO)
    {
        $this->dao = $vehiculoDAO;
    }

    public function listAll(): ?array
    {
        return $this->dao->listAll();
    }

    public function byId(int $id): ?Vehiculo
    {
        return $this->dao->byId($id);
    }

    public function save(Vehiculo $vehiculo): ?Vehiculo
    {
        return $this->dao->save($vehiculo);
    }

    public function update(int $id, Vehiculo $vehiculo): ?Vehiculo
    {
        return $this->update($id, $vehiculo);
    }

    public function delete(int $id): ?Vehiculo
    {
        return $this->delete($id);
    }

    public function reemplazarVehiculo(string $nombreVehiculoViejo, string $nombreVehiculoNuevo, float $precio)
    {
        $this->dao->reemplazarVehiculo($nombreVehiculoViejo, $nombreVehiculoNuevo, $precio);
    }
}
