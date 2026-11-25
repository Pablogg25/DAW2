<?php
require_once __DIR__ . '/MotoDAO.php';
require_once __DIR__ . '/../entidades/Moto.php';

class MotoDAOLog implements MotoDAO
{
    private MotoDAO $dao;

    public function __construct(MotoDAO $dao)
    {
        $this->dao = $dao;
    }

    private function escribirLog(string $mensaje): void
    {
        file_put_contents(
            __DIR__ . '/../log.txt',
            date('Y-m-d H:i:s') . ' - ' . $mensaje . PHP_EOL,
            FILE_APPEND
        );
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
        $nuevo = $this->dao->save($moto);
        if ($nuevo === null) {
            $mensaje = "ERROR AL GUARDAR LA MOTO";
            $this->escribirLog($mensaje);
            return null;
        } else {
            $mensaje = "MOTO GUARDADA CON EXITO - id: " . $nuevo->id . " (" . $nuevo->modelo . ")";
            $this->escribirLog($mensaje);
            return $nuevo;
        }
    }

    public function update(int $id, Moto $moto): ?Moto
    {
        $nuevo = $this->dao->update($id, $moto);
        if ($nuevo === null) {
            $mensaje = "ERROR AL ACTUALIZAR LA MOTO - id: " . $id;
            $this->escribirLog($mensaje);
            return null;
        } else {
            $mensaje = "MOTO ACTUALIZADA CON EXITO - id: " . $id . " (" . $nuevo->modelo . ")";
            $this->escribirLog($mensaje);
            return $nuevo;
        }
    }

    public function delete(Moto $moto): ?Moto
    {
        $nuevo = $this->dao->delete($moto);
        if ($nuevo === null) {
            $mensaje = "ERROR AL ELIMINAR LA MOTO - id: " . $moto->id;
            $this->escribirLog($mensaje);
            return null;
        } else {
            $mensaje = "MOTO ELIMINADA CON EXITO - id: " . $nuevo->id . " (" . $nuevo->modelo . ")";
            $this->escribirLog($mensaje);
            return $nuevo;
        }
    }

    public function sustituirMoto(string $modeloMotoOriginal, string $modeloMotoNueva, float $precioMotoNueva): void
    {
        try {
            $this->dao->sustituirMoto($modeloMotoOriginal, $modeloMotoNueva, $precioMotoNueva);
            $mensaje = "MOTO SUSTITUIDA CON EXITO - " . $modeloMotoOriginal . " POR " . $modeloMotoNueva;
            $this->escribirLog($mensaje);
        } catch (Throwable $e) {
            $mensaje = "ERROR AL SUSTITUIR LA MOTO - " . $modeloMotoOriginal . ": " . $e->getMessage();
            $this->escribirLog($mensaje);
            throw $e;
        }
    }
}
