<?php

require_once __DIR__ . '/../datos/VehiculoDAO.php';

class VehiculoDAOLog implements VehiculoDAO
{
    private VehiculoDAO $dao;

    public function __construct(VehiculoDAO $vehiculoDAO)
    {
        $this->dao = $vehiculoDAO;
    }

    private function escribirLog(string $mensaje)
    {
        file_put_contents(__DIR__ . '/../log.txt', date('Y-m-d H:i:s') . ' - ' . $mensaje . PHP_EOL, FILE_APPEND);
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
        $nuevo = $this->dao->save($vehiculo);
        if ($nuevo === null) {
            $mensaje = 'ERROR AL INSERTAR VEHICULO';
        } else {
            $mensaje = 'VEHICULO INSERTADO CON EXITO';
        }
        $this->escribirLog($mensaje);
        return $nuevo;
    }

    public function update(int $id, Vehiculo $vehiculo): ?Vehiculo
    {
        $nuevo = $this->dao->update($id, $vehiculo);
        if ($nuevo === null) {
            $mensaje = 'ERROR AL ACTUALIZAR VEHICULO';
        } else {
            $mensaje = 'VEHICULO ACTUALIZADO CON EXITO';
        }
        $this->escribirLog($mensaje);
        return $nuevo;
    }

    public function delete(int $id): ?Vehiculo
    {
        $nuevo = $this->dao->delete($id);
        if ($nuevo === null) {
            $mensaje = 'ERROR AL ELIMINAR VEHICULO';
        } else {
            $mensaje = 'VEHICULO ELIMINADO CON EXITO';
        }
        $this->escribirLog($mensaje);
        return $nuevo;
    }

    public function reemplazarVehiculo(string $nombreVehiculoViejo, string $nombreVehiculoNuevo, float $precio)
    {
        $this->dao->reemplazarVehiculo($nombreVehiculoViejo, $nombreVehiculoNuevo, $precio);
    }
}
