<?php

declare(strict_types=1);class Reparacion {
    private int $id;
    private string $matriculaCoche;
    private string $averia;
    private string $reparacionesHechas;
    private float $precio;
    private bool $reparado;

    public function __construct(int $id, string $matriculaCoche, string $averia) {
        $this->id = $id;
        $this->matriculaCoche = $matriculaCoche;
        $this->averia = $averia;
        $this->reparacionesHechas = '';
        $this->precio = 0.0;
        $this->reparado = false;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getMatriculaCoche(): string {
        return $this->matriculaCoche;
    }

    public function getAveria(): string {
        return $this->averia;
    }

    public function getReparacionesHechas(): string {
        return $this->reparacionesHechas;
    }

    public function getPrecio(): float {
        return $this->precio;
    }

    public function isReparado(): bool {
        return $this->reparado;
    }

    public function finalizarReparacion(string $reparacionesHechas, float $precio): void {
        $this->reparacionesHechas = $reparacionesHechas;
        $this->precio = $precio;
        $this->reparado = true;
    }
}   