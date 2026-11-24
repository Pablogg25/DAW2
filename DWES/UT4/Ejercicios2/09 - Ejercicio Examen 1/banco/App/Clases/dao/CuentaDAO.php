<?php
require_once __DIR__ . '/../entidades/Cuenta.php';

interface CuentaDAO
{
    public function listAll(): ?array;
    public function byId(int $id): ?Cuenta;
    public function byIban(string $iban): ?Cuenta;
    public function save(Cuenta $cuenta): ?Cuenta;
    public function update(int $id, Cuenta $cuenta): ?Cuenta;
    public function delete(int $id);
    public function transferir(int $origenId, int $destinoId, float $importe): void;
}
?>