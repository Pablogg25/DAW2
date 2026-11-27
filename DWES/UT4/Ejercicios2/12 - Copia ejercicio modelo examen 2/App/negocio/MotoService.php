<?php

require_once __DIR__ . '/../datos/MotoDAO.php';

class MotoService
{
    private MotoDAO $dao;

    public function __construct(MotoDAO $dao)
    {
        $this->dao = $dao;
    }

    public function listAll(): ?array
    {
        return $this->dao->listAll();
    }
    public function byId(int $id): ?Moto
    {
        return $this->dao->byId($id);
    }
    public function save(Moto $moto): ?Moto
    {
        return $this->dao->save($moto);
    }
    public function update(int $id, Moto $moto): ?Moto
    {
        return null;
    }
    public function delete(Moto $moto): ?Moto
    {
        return null;
    }
    public function sustituirMoto(string $modeloMotoOriginl, string $modeloMotoNueva, string $precioMotoNueva): void {}
}
