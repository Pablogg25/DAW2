<?php
require_once __DIR__ . '/CuentaDAO.php';

class CuentaPDODAO implements CuentaDAO
{
    private PDO $conexion;

    public function __construct(PDO $conexion)
    {
        $this->conexion = $conexion;
    }

    public function listAll(): ?array
    {
        $sql = 'select * from cuentas order by titular;';
        $resultado = $this->conexion->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        $listadoCuentas = [];
        foreach ($resultado as $r) {
            $listadoCuentas[] = new Cuenta(
                (int) $r['id'],
                $r['iban'],
                $r['titular'],
                (float) $r['saldo'],
                $r['estado'],
                $r['created_at']
            );
        }
        return $listadoCuentas;
    }

    public function byId(int $id): ?Cuenta
    {
        $sql = 'select * from cuentas where id=?;';
        $stmt = $this->conexion->prepare($sql);
        $stmt->execute([$id]);
        $fila = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($fila) {
            return new Cuenta(
                (int) $fila['id'],
                $fila['iban'],
                $fila['titular'],
                (float) $fila['saldo'],
                $fila['estado'],
                $fila['created_at']
            );
        }
        return null;
    }

    public function byIban(string $iban): ?Cuenta
    {
        $sql = 'select * from cuentas where iban=?;';
        $stmt = $this->conexion->prepare($sql);
        $stmt->execute([$iban]);
        $fila = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($fila) {
            return new Cuenta(
                (int) $fila['id'],
                $fila['iban'],
                $fila['titular'],
                (float) $fila['saldo'],
                $fila['estado'],
                $fila['created_at']
            );
        }
        return null;
    }

    public function save(Cuenta $cuenta): ?Cuenta
    {
        $sql = 'insert into cuentas (iban,titular,saldo,estado) values (?,?,?,?);';
        $stmt = $this->conexion->prepare($sql);
        $ok = $stmt->execute([
            $cuenta->iban,
            $cuenta->titular,
            $cuenta->saldo,
            $cuenta->estado
        ]);
        if (!$ok) {
            return null;
        }
        $nuevaId = (int) $this->conexion->lastInsertId();
        $cuenta->id = $nuevaId;
        return $cuenta;
    }

    public function update(int $id, Cuenta $cuenta): ?Cuenta
    {
        $sql = 'update cuentas set titular=?, estado=? where id=?;';
        $stmt = $this->conexion->prepare($sql);
        $ok = $stmt->execute([
            $cuenta->titular,
            $cuenta->estado,
            $id
        ]);
        if (!$ok) {
            return null;
        }
        return $this->byId($id);
    }

    public function delete(int $id)
    {
        $sql = 'delete from cuentas where id=?;';
        $stmt = $this->conexion->prepare($sql);
        return $stmt->execute([$id]);
    }

    public function transferir(int $origenId, int $destinoId, float $importe): void
    {
        $this->conexion->beginTransaction();
        try {
            $sqlOrigen = 'update cuentas set saldo = saldo - ? where id = ?;';
            $stmtOrigen = $this->conexion->prepare($sqlOrigen);
            $stmtOrigen->execute([$importe, $origenId]);

            $sqlDestino = 'update cuentas set saldo = saldo + ? where id = ?;';
            $stmtDestino = $this->conexion->prepare($sqlDestino);
            $stmtDestino->execute([$importe, $destinoId]);

            $this->conexion->commit();
        } catch (Throwable $e) {
            if ($this->conexion->inTransaction()) {
                $this->conexion->rollBack();
            }
            throw $e;
        }
    }
}
?>