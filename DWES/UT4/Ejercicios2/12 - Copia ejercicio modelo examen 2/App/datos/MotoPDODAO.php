<?php

require_once __DIR__ . '/../datos/ConexionBD.php';
require_once __DIR__ . '/../datos/MotoDAO.php';

class MotoPDODAO implements MotoDAO
{
    private PDO $conexion;
    public function __construct(PDO $conexion)
    {
        $this->conexion = $conexion;
    }

    public function listAll(): ?array
    {
        $sql = "SELECT * FROM motos";;
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute();
            $lista = [];
            if ($ok) {
                $filas = $consulta->fetchAll();
                foreach ($filas as $f) {
                    $lista[] = new Moto(
                        (int)$f['id'],
                        $f['modelo'],
                        (float)$f['precio']
                    );
                }
            }
            return $lista;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    public function byId(int $id): ?Moto
    {
        $sql = "SELECT * FROM motos WHERE id=?;";
        try {
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$id]);
            if ($ok) {
                $fila = $consulta->fetch();
                if ($fila) {
                    return new Moto(
                        (int) $fila['id'],
                        $fila['modelo'],
                        (float) $fila['precio']
                    );
                } else {
                    return null;
                }
            }
            return null;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    public function save(Moto $moto): ?Moto
    {
        $sql = "INSERT INTO motos(modelo,precio) values(?,?);";
        try{
            $consulta = $this->conexion->prepare($sql);
            $ok = $consulta->execute([$moto->modelo,$moto->precio]);
            if($ok){
                $fila = $consulta->fetch();
                if($fila){
                    return new Moto(
                        (int) $fila['id'],
                        $fila['modelo'],
                        (float)$fila['precio']
                    );
                }else{
                    return null;
                }
            }
            return null;
        }catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
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
