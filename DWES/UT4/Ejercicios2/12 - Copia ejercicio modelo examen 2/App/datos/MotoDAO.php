<?php
require_once __DIR__ . '/../entidad/Moto.php';
interface MotoDAO
{
    public function listAll(): ?array;
    public function byId(int $id): ?Moto;
    public function save(Moto $moto): ?Moto;
    public function update(int $id, Moto $moto): ?Moto;
    public function delete(Moto $moto): ?Moto;
    public function sustituirMoto(string $modeloMotoOriginl, string $modeloMotoNueva, string $precioMotoNueva): void;
}
