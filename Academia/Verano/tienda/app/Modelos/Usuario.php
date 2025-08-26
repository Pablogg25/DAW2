<?php
namespace App\Modelos;
require_once __DIR__ . '/../../vendor/autoload.php';

class Usuario
{
    private int $id_usuario;
    private string $usuario;
    private string $pass;

    public function __construct(int $id, string $user, string $pass)
    {
        $this->id_usuario = $id;
        $this->usuario = $user;
        $this->pass = $pass;
    }

    public function getId(): int
    {
        return $this->id_usuario;
    }

    public function setId(int $id): void
    {
        $this->id_usuario = $id;
    }

    public function getUsuario(): string
    {
        return $this->usuario;
    }

    public function setUsuario(string $u): void
    {
        $this->usuario = $u;
    }

    public function getPass(): string
    {
        return $this->pass;
    }

    public function setPass(string $p): void
    {
        $this->pass = $p;
    }
}
?>