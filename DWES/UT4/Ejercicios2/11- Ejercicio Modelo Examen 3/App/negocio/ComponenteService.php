<?php
require_once __DIR__ . '/../datos/ComponenteDAO.php';
require_once __DIR__ . '/../entidades/Componente.php';

class ComponenteService
{
    private ComponenteDAO $dao;

    public function __construct(ComponenteDAO $dao)
    {
        $this->dao = $dao;
    }
    public function listAll(): ?array
    {
        return $this->dao->listAll();
    }
    public function save(Componente $componente): ?Componente
    {
        return $this->dao->save($componente);
    }
    public function update(int $id, Componente $componente): ?Componente
    {
        return $this->dao->update($id, $componente);
    }
    public function delete(int $id): ?Componente
    {
        return $this->dao->delete($id);
    }
    public function sustituirComponente(string $nombreViejo, string $nombreNuevo, float $precio): void
    {
        $this->dao->sustituirComponente($nombreViejo, $nombreNuevo, $precio);
    }
}
