<?php
require_once __DIR__ . '/../datos/ConexionDB.php';
require_once __DIR__ . '/../datos/VehiculoDAO.php';

class VehiculoPDODAO implements VehiculoDAO
{
    private PDO $conexion;

    public function __construct(PDO $conexion)
    {
        $this->conexion = $conexion;
    }

    public function listAll(): ?array
    {
        $sql = 'SELECT * FROM vehiculos;';
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute();
            $listado = [];

            if ($ok) {
                $filas = $consulta->fetchAll();
                if ($filas) {
                    foreach ($filas as $f) {
                        $listado[] = new Vehiculo(
                            (int) $f['id'],
                            $f['nombre'],
                            (float) $f['precio']
                        );
                    }
                    return $listado;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function byId(int $id): ?Vehiculo
    {
        $sql = 'SELECT * FROM vehiculos WHERE id=?;';
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$id]);
            if ($ok) {
                $fila = $consulta->fetch();
                if ($fila) {
                    return new Vehiculo(
                        (int) $fila['id'],
                        $fila['nombre'],
                        (float) $fila['precio']
                    );
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function save(Vehiculo $vehiculo): ?Vehiculo
    {
        $sql = 'INSERT INTO vehiculos(nombre,precio) values(?,?);';
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$vehiculo->nombre, $vehiculo->precio]);
            if ($ok) {
                $fila = $consulta->fetch();
                if ($fila) {
                    return new Vehiculo(
                        (int) $fila['id'],
                        $fila['nombre'],
                        (float) $fila['precio']
                    );
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function update(int $id, Vehiculo $vehiculo): ?Vehiculo
    {
        $sql = 'UPDATE vehiculos SET nombre=?,precio=? WHERE id=?;';
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$vehiculo->nombre, $vehiculo->precio, $id]);
            if ($ok) {
                $vehiculo->id = $id;
                return $vehiculo;
            } else {
                return null;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function delete(int $id): ?Vehiculo
    {
        $sql = 'DELETE FROM vehiculos WHERE id=?;';
        $backUp = $this->byId($id);
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$id]);
            if ($ok) {
                return $backUp;
            } else {
                return null;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function reemplazarVehiculo(string $nombreVehiculoViejo, string $nombreVehiculoNuevo, float $precio)
    {
        $this->conexion->beginTransaction();

        $sql = 'SELECT * FROM vehiculos where nombre=?;';
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$nombreVehiculoViejo]);
            if ($ok) {
                $fila = $consulta->fetch();
                if ($fila) {
                    $this->delete($fila['id']);
                    $this->save(new Vehiculo(0, $nombreVehiculoNuevo, $precio));
                } else {
                    $this->conexion->rollBack();
                }
            }
        } catch (Exception $e) {
            if ($this->conexion->inTransaction()) {
                $this->conexion->rollBack();
            }
            throw new Exception($e->getMessage());
        }
    }
}
