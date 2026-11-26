<?php
require_once __DIR__ . '/ComponenteDAO.php';

class ComponenteDAOLog implements ComponenteDAO
{
    private ComponenteDAO $dao;

    public function __construct(ComponenteDAO $dao)
    {
        $this->dao = $dao;
    }
    private function escribirLog(string $mensaje)
    {
        file_put_contents(__DIR__ . '/../log.txt', date('Y-m-d H:i:s') . ' - ' . $mensaje . PHP_EOL, FILE_APPEND);
    }

    public function listAll(): ?array
    {
        return $this->dao->listAll();
    }
    public function save(Componente $componente): ?Componente
    {
        $nuevo =  $this->dao->save($componente);

        if ($nuevo === null) {
            $mensaje = "ERROR AL GUARDAR";
        } else {
            $mensaje = "COMPONENTE GUARDADO";
        }
        $this->escribirLog($mensaje);
        return $nuevo;
    }
    public function update(int $id, Componente $componente): ?Componente
    {
        $nuevo = $this->dao->update($id, $componente);
        if ($nuevo === null) {
            $mensaje = "ERROR AL ACTUALIZAR";
        } else {
            $mensaje = "COMPONENTE ACTUALIZADO";
        }
        $this->escribirLog($mensaje);
        return $nuevo;
    }
    public function delete(int $id): ?Componente
    {
        $nuevo = $this->dao->delete($id);
        if ($nuevo === null) {
            $mensaje = "ERROR AL BORRAR";
        } else {
            $mensaje = "COMPONENTE BORRADO";
        }
        $this->escribirLog($mensaje);
        return $nuevo;
    }
    public function sustituirComponente(string $nombreViejo, string $nombreNuevo, float $precio): void
    {
        try {
            $this->dao->sustituirComponente($nombreViejo, $nombreNuevo, $precio);
            $mensaje = "COMPONENTE SUSTITUIDO";
            $this->escribirLog($mensaje);
        } catch (Exception $e) {
            $mensaje = "ERROR AL SUSTITUIR";
            $this->escribirLog($mensaje);
            throw new Exception($e->getMessage());
        }
    }
}
