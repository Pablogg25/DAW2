<?php declare(strict_types=1);

class Coche {
    private string $matricula;
    private string $marca;
    private string $modelo;
    private string $nifCliente;

    public function __construct(string $matricula, string $marca, string $modelo, string $nifCliente) {
        $this->matricula = $matricula;
        $this->marca = $marca;
        $this->modelo = $modelo;
        $this->nifCliente = $nifCliente;
    }

    public function getMatricula(): string {
        return $this->matricula;
    }

    public function getMarca(): string {
        return $this->marca;
    }

    public function getModelo(): string {
        return $this->modelo;
    }

    public function getNifCliente(): string {
        return $this->nifCliente;
    }
}