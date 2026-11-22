<?php
require_once __DIR__.'/./CuentaDAO.php';
class CuentaPDODAO implements CuentaDAO{

    private PDO $conexion;

    public function __construct(PDO $conexion){
        $this->conexion=$conexion;
    }

    public function listAll():?array{
        $sql="select * from cuentas;";
        $resultado=$this->conexion->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        $listadoCuentas=[];
        foreach($resultado as $r){
            $listadoCuentas[]=new Cuenta(
                (int)$r['id'],
                $r['iban'],
                $r['titular'],
                (float)$r['saldo'],
                $r['estado'],
                $r['created_at']
            );
        }
        return $listadoCuentas;
    }
    public function byId(int $id):?Cuenta{
        $sql="select * from cuentas where id=?;";
        $fila=$this->conexion->execute([$id])->fetch(PDO::FETCH_ASSOC);
        if($fila){
            return new Cuenta(
                (int)$fila['id'],
                $fila['iban'],
                $fila['titular'],
                (float)$fila['saldo'],
                $fila['estado'],
                $fila['created_at']
            );
        }
        return null;
    }
    public function save(Cuenta $cuenta):?Cuenta{
        $sql="insert into cuentas (iban,titular,saldo,estado,created_at)
        values (?,?,?,?,?);";
        $fila=$this->conexion->execute(
            [
                $cuenta->iban,
                $cuenta->titular,
                $cuenta->saldo,
                $cuenta->estado,
                $cuenta->createdAt
            ]
        )->fetch(PDO::FETCH_ASSOC);
        if(!$fila){
            return null;
        }
        (int) $nuevaId=$this->conexion->lastInsertId();
        $cuenta->id=$nuevaId;
        return $cuenta;
    }
    public function update(int $id,Cuenta $cuenta):?Cuenta{
        $sql="update cuentas set iban=?, titular=?, saldo=?, estado=? where id=?;";
        $fila=$this->conexion->execute(
            [
                $cuenta->iban,
                $cuenta->titular,
                $cuenta->saldo,
                $cuenta->estado,
                $id
            ]
        )->fetch(PDO:FETCH_ASSOC);
    }
    public function delete(int $id){
        
    }
}
?>