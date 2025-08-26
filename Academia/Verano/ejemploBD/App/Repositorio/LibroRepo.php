<?php
namespace App\Repositorio;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Libro;
use App\Repositorio\ILibroRepo;
use App\Util\Conexion;
use PDO;

class LibroRepo implements ILibroRepo
{
    private $conexion = null;// va a cascar

    public function __construct()
    {
        $this->conexion = Conexion::getConexion();
    }

    public function listarTodos(): ?array
    {
        $lista = [];
        $consulta = "select cod_libro,titulo,autor,copias from libros;";
        $resultado = $this->conexion->query($consulta);
        $i = 0;
        while ($r = $resultado->fetch()) {
            $libro = new Libro(
                $r["autor"],
                $r["cod_libro"],
                $r["copias"],
                $r["titulo"]
            );
            $lista[$i] = $libro;
            $i++;
        }
        return $lista;
    }

    public function porId(string $cod_libro): ?Libro
    {
        $libro = null;
        $sql = "select cod_libro,titulo,autor,copias from libros where cod_libro=?;";
        $consulta = $this->conexion->prepare($sql);
        $consulta->bindParam(1, $cod_libro);
        $consulta->execute();
        while ($r = $consulta->fetch())
            $libro = new Libro(
                $r["autor"],
                $r["cod_libro"],
                $r["copias"],
                $r["titulo"]
            );

        return $libro;
    }

    public function inserta(Libro $libro): bool
    {
        $exito = false;
        $sql = "insert into libros (cod_libro,titulo,autor,copias) values (?, ?, ?, ?);";
        $consulta = $this->conexion->prepare($sql);
        $codLibro = $libro->getCodLibro();
        $titulo = $libro->getTitulo();
        $autor = $libro->getAutor();
        $copias = $libro->getCopias();
        $consulta->bindParam(1, $codLibro);
        $consulta->bindParam(2, $titulo);
        $consulta->bindParam(3, $autor);
        $consulta->bindParam(4, $copias);
        $resultado = $consulta->execute();
        if ($resultado)
            $exito = true;
        return $exito;
    }

    public function modifica(string $cod_libro, Libro $libro): bool
    {
        $exito = false;
        $sql = "update libros set titulo=?, autor=?, copias=? where cod_libro=?;";
        $consulta = $this->conexion->prepare($sql);
        $titulo = $libro->getTitulo();
        $autor = $libro->getAutor();
        $copias = $libro->getCopias();
        $consulta->bindParam(1, $titulo);
        $consulta->bindParam(2, $autor);
        $consulta->bindParam(3, $copias);
        $consulta->bindParam(4, $cod_libro);
        $resultado = $consulta->execute();
        if ($resultado)
            $exito = true;
        return $exito;
    }

    public function elimina(string $cod_libro): bool
    {
        $exito = false;
        $sql = "delete from libros where cod_libro=?;";
        $consulta = $this->conexion->prepare($sql);
        $consulta->bindParam(1, $cod_libro);
        $resultado = $consulta->execute();
        if ($resultado)
            $exito = true;
        return $exito;
    }
}
?>