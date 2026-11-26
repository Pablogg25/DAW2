<?php
require_once __DIR__ . '/../datos/ComponenteDAO.php';

class ComponentePDODAO implements ComponenteDAO
{
    private PDO $conexion;

    public function __construct(PDO $conexion)
    {
        $this->conexion = $conexion;
    }

    public function listAll(): ?array
    {
        $sql = "SELECT * FROM componentes";
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute();
            $listado = [];
            if ($ok) {
                $resultado = $consulta->fetchAll();
                foreach ($resultado as $r) {
                    $listado[] = new Componente(
                        (int)$r['id'],
                        $r['nombre'],
                        (float)$r['precio']
                    );
                }
            }
            return $listado;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function byID(int $id)
    {
        $sql = "SELECT * FROM componentes WHERE id=?;";
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$id]);
            if ($ok) {
                $fila = $consulta->fetch();
                if ($fila) {
                    return new Componente(
                        (int)$fila['id'],
                        $fila['nombre'],
                        (float)$fila['precio']
                    );
                } else {
                    return null;
                }
            }
            return null;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function save(Componente $componente): ?Componente
    {
        $sql = "INSERT into componentes(nombre,precio) values(?,?);";
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$componente->nombre, $componente->precio]);
            if ($ok) {
                $fila = $consulta->fetch();
                if ($fila) {
                    return new Componente(
                        (int)$fila['id'],
                        $fila['nombre'],
                        (float)$fila['precio']
                    );
                } else {
                    return null;
                }
            }
            return null;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
            return null;
        }
    }
    public function update(int $id, Componente $componente): ?Componente
    {
        $sql = "UPDATE componentes set nombre=?,precio=? where id=?;";
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$componente->nombre, $componente->precio, $id]);
            if ($ok) {
                $componente->id = $id;
                return $componente;
            } else {
                return null;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    public function delete(int $id): ?Componente
    {
        $componente = $this->byID($id);
        $sql = "DELETE FROM componentes WHERE id=?;";
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$id]);
            if ($ok) {
                return $componente;
            } else {
                return null;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    public function sustituirComponente(string $nombreViejo, string $nombreNuevo, float $precio): void
    {
        $this->conexion->beginTransaction();

        try {
            $nombreViejo = trim(strtolower($nombreViejo));
            $sql = "SELECT * FROM componentes WHERE nombre = ?;";
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$nombreViejo]);
            if ($ok) {
                $fila = $consulta->fetch();
                if ($fila) {
                    $id = $fila['id'];
                    $this->delete($id);
                    $this->save(new Componente(0, $nombreNuevo, $precio));
                    $this->conexion->commit();
                } else {
                    throw new Exception("No se ha encontrado resultado");
                }
            } else {

                throw new Exception("No se ha encontrado resultado");
            }
        } catch (Exception $e) {
            if ($this->conexion->inTransaction()) {
                $this->conexion->rollBack();
            }
            throw new Exception($e->getMessage());
        }
    }
}
