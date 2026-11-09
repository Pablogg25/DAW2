<?php
declare(strict_types=1);class Cliente {
    private string $nif;
    private string $nombre;

    public function __construct(string $nif, string $nombre) {
        $this->nif = $nif;
        $this->nombre = $nombre;
    }

    public function getNif(): string {
        return $this->nif;
    }

    public function getNombre(): string {
        return $this->nombre;
    }
}