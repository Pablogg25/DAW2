<?php
namespace App\Modelos;
class Libro
{
    private string $autor;
    private string $cod_libro;
    private int $copias;
    private string $titulo;

    public function __construct(string $autor, string $cod_libro, int $copias, string $titulo)
    {
        $this->autor = $autor;
        $this->cod_libro = $cod_libro;
        $this->copias = $copias;
        $this->titulo = $titulo;
    }

    public function getAutor(): string
    {
        return $this->autor;
    }

    public function setAutor(string $autor): void
    {
        $this->autor = $autor;
    }

    public function getCodLibro(): string
    {
        return $this->cod_libro;
    }

    public function setCodLibro(string $cod_libro): void
    {
        $this->cod_libro = $cod_libro;
    }

    public function getCopias(): int
    {
        return $this->copias;
    }

    public function setCopias(int $copias): void
    {
        $this->copias = $copias;
    }

    public function getTitulo(): string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): void
    {
        $this->titulo = $titulo;
    }
}
?>