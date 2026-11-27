<?php

require_once __DIR__ . '/../datos/MotoDAO.php';

class MotoDAOLog implements MotoDAO
{
    private MotoDAO $dao;

    public function __construct(MotoDAO $dao)
    {
        $this->dao = $dao;
    }

    private function escribirLog(string  $mensaje)
    {
        file_put_contents(__DIR__ . '/../log.txt', date('Y-m-d H:i:s') . ' - ' . $mensaje . PHP_EOL, FILE_APPEND);
    }

    public function save(Moto $moto): ?Moto
    {
        $nuevo = $this->dao->save($moto);
        if ($nuevo === null) {
            $this->escribirLog("ERROR AL GUARDAR");
            return null;
        } else {
            $this->escribirLog("MOTO GUARDADA");
            return $nuevo;
        }
    }

    public function listAll(): ?array
    {
        return $this->dao->listAll();
    }
    public function byId(int $id): ?Moto
    {
        return null;
    }

    public function update(int $id, Moto $moto): ?Moto
    {
        $nuevo = $this->dao->update($id, $moto);
        if ($nuevo === null) {
            $this->escribirLog("ERROR AL ACTUALIZAR");
            return null;
        } else {
            $this->escribirLog("MOTO ACTUALIZAR");
            return $nuevo;
        }
    }
    public function delete(int $id): ?Moto
    {
        $nuevo = $this->dao->delete($id);
        if ($nuevo === null) {
            $this->escribirLog("ERROR AL BORRAR");
            return null;
        } else {
            $this->escribirLog("MOTO BORRADA");
            return $nuevo;
        }
    }
    public function sustituirMoto(string $modeloMotoOriginl, string $modeloMotoNueva, string $precioMotoNueva): void {}
}
