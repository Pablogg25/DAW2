<?php
class Coche
{
    private String $matricula;
    private int $velocidad;

    public function __construct($matricula, $velocidad)
    {
        $this->velocidad = $velocidad;
        $this->matricula = $matricula;
    }

    public function acelera($aceleracion)
    {
        $this->velocidad = $this->velocidad + $aceleracion;
        if ($this->velocidad > 120 || $this->velocidad < 0) $this->velocidad = 100;
    }
    public function frena($frena)
    {
        $this->velocidad = $this->velocidad - $frena;
        if ($this->velocidad > 120 || $this->velocidad < 0) $this->velocidad = 100;
    }

    public function getMatricula(){
        return $this->matricula;
    }

    public function getVelocidad(){
        return $this->velocidad;
    }
}
