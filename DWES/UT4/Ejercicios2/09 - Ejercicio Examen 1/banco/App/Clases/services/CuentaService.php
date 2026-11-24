<?php
require_once __DIR__ . '/../dao/CuentaDAO.php';
require_once __DIR__ . '/../entidades/Cuenta.php';

class CuentaService
{
    private CuentaDAO $dao;

    public function __construct(CuentaDAO $dao)
    {
        $this->dao = $dao;
    }

    public function listarTodas(): array
    {
        return $this->dao->listAll() ?? [];
    }

    public function buscarPorId(int $id): ?Cuenta
    {
        return $this->dao->byId($id);
    }

    public function listarActivasConSaldo(): array
    {
        $todas = $this->listarTodas();
        $activasConSaldo = [];

        foreach ($todas as $c) {
            if ($c->estado === 'ACTIVA' && $c->saldo > 0) {
                $activasConSaldo[] = $c;
            }
        }
        return $activasConSaldo;
    }

    public function listarActivas(): array
    {
        $todas = $this->dao->listAll();
        $activas = [];
        foreach ($todas as $c) {
            if ($esado === 'ACTIVA') {
                $activas[] = $c;
            }
        }
        return $activas;
    }

    public function crearCuenta(string $iban, string $titular, float $saldoInicial): void
    {
        $titularLimpio = trim($titular);
        if ($titularLimpio === '' || mb_strlen($titularLimpio) > 100) {
            throw new InvalidArgumentException('El titular es obligatorio y debe tener menos de 100 caracteres');
        }
        $ibanLimpio = strtoupper(trim($iban));
        if (preg_match('/^ES\d{22}$/', $ibanLimpio) !== 1) {
            throw new InvalidArgumentException('El IBAN debe tener el formato ES seguido de 22 dígitos.');
        }

        if ($this->dao->byIban($ibanLimpio) !== null) {
            throw new InvalidArgumentException("Ya existe una cuenta con el IBAN {$ibanLimpio}.");
        }

        if ($saldoInicial < 0) {
            throw new InvalidArgumentException('El saldo inicial no puede ser negativo.');
        }

        $cuenta = new Cuenta(null, $ibanLimpio, $titularLimpio, $saldoInicial, 'ACTIVA');
        $this->dao->save($cuenta);
    }

    public function modificarCuenta(int $id, string $titular, string $estado): void
    {
        $cuenta = $this->dao->byId($id);
        if ($cuenta === null) {
            throw new InvalidArgumentException("No existe ninguna cuenta con ID {$id}");
        }
        $titularLimpio = trim($titular);
        if ($titularLimpio === '' || mb_strlen($titularLimpio) > 100) {
            throw new InvalidArgumentException('El titular es obligatorio y debe tener como máximo 100 caracteres.');
        }

        if ($estado !== 'ACTIVA' && $estado !== 'BLOQUEADA') {
            throw new InvalidArgumentException('El estado debe ser ACTIVA o BLOQUEADA.');
        }

        $cuenta->titular = $titularLimpio;
        $cuenta->estado = $estado;
        $this->dao->update($id, $cuenta);
    }

    public function eliminarCuenta(int $id): void
    {
        $cuenta = $this->dao->byId($id);
        if ($cuenta === null) {
            throw new InvalidArgumentException("No existe ninguna cuenta con ID {$id}.");
        }

        if ($cuenta->saldo > 0) {
            throw new InvalidArgumentException('No se puede borrar una cuenta con saldo mayor que 0.');
        }

        $this->dao->delete($id);
    }

    public function transferir(int $origenId, int $destinoId, float $importe): void
    {
        if ($importe <= 0) {
            throw new InvalidArgumentException('El importe debe ser mayor que 0.');
        }

        if ($origenId === $destinoId) {
            throw new InvalidArgumentException('Las cuentas de origen y destino deben ser distintas.');
        }

        $origen = $this->dao->byId($origenId);
        if ($origen === null) {
            throw new InvalidArgumentException('La cuenta de origen no existe.');
        }

        $destino = $this->dao->byId($destinoId);
        if ($destino === null) {
            throw new InvalidArgumentException('La cuenta de destino no existe.');
        }

        if ($origen->estado !== 'ACTIVA' || $destino->estado !== 'ACTIVA') {
            throw new InvalidArgumentException('Ambas cuentas deben estar en estado ACTIVA.');
        }

        if ($importe > $origen->saldo) {
            throw new InvalidArgumentException('Saldo insuficiente en la cuenta de origen.');
        }

        $this->dao->transferir($origenId, $destinoId, $importe);
    }
}
