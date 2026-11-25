<?php
require_once __DIR__ . '/../datos/MotoDAO.php';
// require_once __DIR__ . '/../datos/ConexionBD.php';

class MotoPDODAO implements MotoDAO
{
    private PDO $conexion;

    public function __construct(PDO $conexion)
    {
        $this->conexion = $conexion;
    }

    public function listAll(): ?array
    {
        $sql = "SELECT * FROM motos";
        $resultado = $this->conexion->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        $listadoMotos = [];

        foreach ($resultado as $r) {
            $listadoMotos[] = new Moto(
                (int) $r['id'],
                $r['modelo'],
                (float)$r['precio']
            );
        }
        if (count($listadoMotos) !== 0) {
            return $listadoMotos;
        } else {
            return null;
        }
    }
    public function byId(int $id): ?Moto
    {
        $sql = "SELECT * FROM motos WHERE id = ?";
        $consulta = $this->conexion->prepare($sql);
        $ok = $consulta->execute([$id]);
        if ($ok) {
            $fila = $consulta->fetch(PDO::FETCH_ASSOC);
            if ($fila) {
                return new Moto(
                    (int) $fila['id'],
                    $fila['modelo'],
                    (float)$fila['precio']
                );
            } else {
                return null;
            }
        }
        return new Moto(1, "hola", 2.23);
    }
    public function save(Moto $moto): ?Moto
    {
        $sql = "insert into motos(modelo,precio) values(?,?);";
        $consulta = $this->conexion->prepare($sql);
        $ok = $consulta->execute([$moto->modelo, $moto->precio]);
        if ($ok) {
            $nuevaId = $this->conexion->lastInsertId();
            $moto->id = $nuevaId;
            return $moto;
        } else {
            return null;
        }
    }
    public function update(int $id, Moto $moto): ?Moto
    {
        $sql = "update motos set modelo=?, precio=? where id=?;";

        $consulta = $this->conexion->prepare($sql);
        $ok = $consulta->execute([$moto->modelo, $moto->precio, $id]);
        if ($ok) {
            $moto->id = $id;
            return $moto;
        } else {
            return null;
        }
    }
    public function delete(Moto $moto): ?Moto
    {
        $sql = "delete from motos where id=?;";
        $consulta = $this->conexion->prepare($sql);
        $ok = $consulta->execute([$moto->id]);
        if ($ok) {
            return $moto;
        } else {
            return null;
        }
    }
    public function sustituirMoto(string $modeloMotoOriginal, string $modeloMotoNueva, float $precioMotoNueva): void
    {
        $this->conexion->beginTransaction();

        try {
            // 1. Buscar la moto antigua
            $stmtBuscar = $this->conexion->prepare("SELECT id FROM motos WHERE LOWER(TRIM(modelo)) = LOWER(TRIM(?)) LIMIT 1");
            $stmtBuscar->execute([$modeloMotoOriginal]);
            $fila = $stmtBuscar->fetch(PDO::FETCH_ASSOC);

            if (!$fila) {
                throw new RuntimeException("No existe ninguna motocicleta con el modelo '{$modeloMotoOriginal}'.");
            }

            // 2. Eliminar la moto antigua
            $stmtDelete = $this->conexion->prepare("DELETE FROM motos WHERE id = ?");
            $stmtDelete->execute([(int) $fila['id']]);

            // 3. Insertar la moto nueva
            $stmtInsert = $this->conexion->prepare("INSERT INTO motos (modelo, precio) VALUES (?, ?)");
            $stmtInsert->execute([trim($modeloMotoNueva), $precioMotoNueva]);

            $this->conexion->commit();
        } catch (Throwable $e) {
            if ($this->conexion->inTransaction()) {
                $this->conexion->rollBack();
            }
            throw $e;
        }
    }
}
