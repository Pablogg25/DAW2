<?php
declare(strict_types=1);

class TallerService {
    private Taller $taller;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['taller'])) {
            $_SESSION['taller'] = new Taller();
            $this->cargarDatosPrueba($_SESSION['taller']);
        }

        $this->taller = $_SESSION['taller'];
    }

    private function cargarDatosPrueba(Taller $taller): void {
        $taller->addCliente(new Cliente("12345678A", "Juan Pérez"));
        $taller->addCoche(new Coche("1234ABC", "Audi", "A3", "12345678A"));
    }

    public function getTaller(): Taller {
        return $this->taller;
    }

    public function registrarCliente(string $nif, string $nombre): void {
        if ($this->taller->getClienteByNif($nif) !== null) {
            throw new Exception("Ya existe un cliente con el NIF {$nif}.");
        }
        $this->taller->addCliente(new Cliente($nif, $nombre));
    }

    public function registrarCoche(string $matricula, string $marca, string $modelo, string $nifCliente): void {
        if ($this->taller->getCocheByMatricula($matricula) !== null) {
            throw new Exception("Ya existe un coche con la matrícula {$matricula}.");
        }
        if ($this->taller->getClienteByNif($nifCliente) === null) {
            throw new Exception("El NIF de cliente indicado no existe.");
        }
        $this->taller->addCoche(new Coche($matricula, $marca, $modelo, $nifCliente));
    }

    public function registrarAveria(string $matricula, string $averia): void {
        if ($this->taller->getCocheByMatricula($matricula) === null) {
            throw new Exception("El coche seleccionado no existe.");
        }
        $this->taller->addAveria($matricula, $averia);
    }

    public function finalizarReparacion(int $idReparacion, string $trabajos, float $precio): void {
        $reparacion = $this->taller->getReparacionById($idReparacion);
        if (!$reparacion) {
            throw new Exception("La reparación especificada no existe.");
        }
        if ($reparacion->isReparado()) {
            throw new Exception("Esta reparación ya había sido completada anteriormente.");
        }
        $reparacion->finalizarReparacion($trabajos, $precio);
    }
}