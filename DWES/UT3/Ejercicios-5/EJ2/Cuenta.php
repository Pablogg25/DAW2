<?php
class Cuenta
{
    private int $numero;
    private string $titular;
    private float $saldo;

    function __construct($numero, $titular, $saldo)
    {
        $this->numero = $numero;
        $this->titular = $titular;
        $this->saldo = $saldo;
    }

    function ingreso($cantidad)
    {
        $this->saldo = $this->saldo + $cantidad;
    }

    function reintegro($cantidad)
    {
        $this->saldo = $this->saldo - $cantidad;
    }

    function esPreferencial($cantidad)
    {
        if ($this->saldo > $cantidad) {
            return true;
        } else {
            return false;
        }
    }

    function mostrar() {}
}
