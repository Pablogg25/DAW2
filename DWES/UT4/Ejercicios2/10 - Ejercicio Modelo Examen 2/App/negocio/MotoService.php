<?php
require_once __DIR__ . '/../datos/MotoDAO.php';
require_once __DIR__ . '/../entidades/Moto.php';
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
        return $this->dao->update($id, $moto);
    }

    public function delete(Moto $moto): ?Moto
    {
        return $this->dao->delete($moto);
    }

    public function sustituirMoto(string $modeloMotoOriginal, string $modeloMotoNueva, float $precioMotoNueva): void
    {
        if (trim($modeloMotoOriginal) === '' || trim($modeloMotoNueva) === '') {
            throw new InvalidArgumentException('Debes indicar tanto el modelo a sustituir como el nuevo modelo.');
        }
        if ($precioMotoNueva < 0) {
            throw new InvalidArgumentException('El precio de la nueva motocicleta no puede ser negativo.');
        }

        $this->dao->sustituirMoto($modeloMotoOriginal, $modeloMotoNueva, $precioMotoNueva);
    }
}
