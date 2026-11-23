<?php
class Taller {
    private array $clientes;
    private array $coches;
    private array $reparaciones;
    private int $contadorReparaciones;

    public function __construct() {
        $this->clientes = [];
        $this->coches = [];
        $this->reparaciones = [];
        $this->contadorReparaciones = 1;
    }

    // --- GESTIÓN DE CLIENTES ---
    public function addCliente(Cliente $cliente): void {
        $this->clientes[$cliente->getNif()] = $cliente;
    }

    public function getClientes(): array {
        return $this->clientes;
    }

    public function getClienteByNif(string $nif): ?Cliente {
        return $this->clientes[$nif] ?? null;
    }

    // --- GESTIÓN DE COCHES ---
    public function addCoche(Coche $coche): void {
        $this->coches[$coche->getMatricula()] = $coche;
    }

    public function getCoches(): array {
        return $this->coches;
    }

    public function getCocheByMatricula(string $matricula): ?Coche {
        return $this->coches[$matricula] ?? null;
    }

    public function getCochesPorCliente(string $nifCliente): array {
        $resultado = [];
        foreach ($this->coches as $coche) {
            if ($coche->getNifCliente() === $nifCliente) {
                $resultado[] = $coche;
            }
        }
        return $resultado;
    }

    // --- GESTIÓN DE REPARACIONES ---
    public function addAveria(string $matricula, string $averia): void {
        $reparacion = new Reparacion($this->contadorReparaciones++, $matricula, $averia);
        $this->reparaciones[] = $reparacion;
    }

    public function getReparaciones(): array {
        return $this->reparaciones;
    }

    public function getReparacionById(int $id): ?Reparacion {
        foreach ($this->reparaciones as $reparacion) {
            if ($reparacion->getId() === $id) {
                return $reparacion;
            }
        }
        return null;
    }

    // --- MÉTODO: IMPRIMIR FACTURA ---
    public function imprimirFactura(Reparacion $reparacion): ?array {
        if (!$reparacion->isReparado()) {
            return null;
        }

        $coche = $this->getCocheByMatricula($reparacion->getMatriculaCoche());
        if (!$coche) {
            return null;
        }

        $cliente = $this->getClienteByNif($coche->getNifCliente());
        if (!$cliente) {
            return null;
        }

        return [
            'id'               => $reparacion->getId(),
            'cliente_nombre'   => $cliente->getNombre(),
            'cliente_nif'      => $cliente->getNif(),
            'coche_matricula'  => $coche->getMatricula(),
            'coche_marca'      => $coche->getMarca(),
            'coche_modelo'     => $coche->getModelo(),
            'averia'           => $reparacion->getAveria(),
            'reparaciones'     => $reparacion->getReparacionesHechas(),
            'precio'           => $reparacion->getPrecio()
        ];
    }

    // --- MÉTODO: TOTAL IMPORTE GANADO ---
    public function getTotalGanado(): float {
        $total = 0.0;
        foreach ($this->reparaciones as $reparacion) {
            if ($reparacion->isReparado()) {
                $total += $reparacion->getPrecio();
            }
        }
        return $total;
    }
}