<?php
namespace App\Modelos;
class Usuario
{
    private int $id;
    private string $usuario;
    private string $pass;

    public function __construct(int $id, string $n, string $p)
    {
        $this->id = $id;
        $this->usuario = $n;
        $this->pass = $p;
    }

    public function getPass(): string
    {
        return $this->pass;
    }

    public function setPass(string $p): void
    {
        $this->pass = $p;
    }

    public function getUsuario(): string
    {
        return $this->usuario;
    }

    public function setUsuario(string $u): void
    {
        $this->usuario = $u;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getId(): int
    {
        return $this->id;
    }
}
?>