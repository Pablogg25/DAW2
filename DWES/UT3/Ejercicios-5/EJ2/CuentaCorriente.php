<?php
require "Cuenta.php";
class CuentaCorriente extends Cuenta
{
    private int $cuota_mantenimiento;
    public function __construct(int $cuota_mantenimiento)
    {

        $this->saldo -= $cuota_mantenimiento;
    }

    public function reintegro($cantidad)
    {
        if ($this->saldo > 20) {
            $this->saldo += $cantidad;
        }
    }
}
