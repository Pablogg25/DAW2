<?php
require "Cuenta.php";

class CuentaAhorro extends Cuenta
{
    private float $comision_apertura;
    private float $intereses;
    function __construct($comision_apertura, $intereses)
    {
        $this->saldo -= $comision_apertura;
        $this->intereses = $intereses;
    }

    function aplicaInteres()
    {
        $this->saldo = $this->saldo + ($this->saldo * $this->intereses);
    }

    function mostrar() {}
}
