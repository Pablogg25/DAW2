<?php
require_once __DIR__ . '/CuentaDAO.php';

class CuentaDAOLog implements CuentaDAO
{
    private CuentaDAO $dao;
    private string $rutaLog;

    public function __construct(CuentaDAO $dao, string $rutaLog)
    {
        $this->dao = $dao;
        $this->rutaLog = $rutaLog;
    }

    public function listAll(): ?array
    {
        return $this->dao->listAll();
    }

    public function byId(int $id): ?Cuenta
    {
        return $this->dao->byId($id);
    }

    public function byIban(string $iban): ?Cuenta
    {
        return $this->dao->byIban($iban);
    }

    public function save(Cuenta $cuenta): ?Cuenta
    {
        $resultado = $this->dao->save($cuenta);
        $this->escribirLog("ALTA CUENTA: {$cuenta->titular}");
        return $resultado;
    }

    public function update(int $id, Cuenta $cuenta): ?Cuenta
    {
        $resultado = $this->dao->update($id, $cuenta);
        $this->escribirLog("MODIFICACION CUENTA ID={$id}");
        return $resultado;
    }

    public function delete(int $id)
    {
        $resultado = $this->dao->delete($id);
        $this->escribirLog("BORRADO CUENTA ID={$id}");
        return $resultado;
    }

    public function transferir(int $origenId, int $destinoId, float $importe): void
    {
        $this->dao->transferir($origenId, $destinoId, $importe);
        $importeFormateado = number_format($importe, 2, '.', '');
        $this->escribirLog("TRANSFERENCIA {$importeFormateado} EUR CUENTA ID={$origenId} -> CUENTA ID={$destinoId}");
    }

    private function escribirLog(string $mensaje): void
    {
        $linea = date('Y-m-d H:i:s') . ' - ' . $mensaje . PHP_EOL;
        file_put_contents($this->rutaLog, $linea, FILE_APPEND);
    }
}
?>