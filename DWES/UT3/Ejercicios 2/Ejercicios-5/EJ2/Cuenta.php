<?php
class Cuenta
{
    protected int $numero;
    protected string $titular;
    protected float $saldo;

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
