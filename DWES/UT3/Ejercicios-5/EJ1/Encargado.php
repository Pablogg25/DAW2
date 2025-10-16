<?php
require "Empleado.php";
class Encargado extends Empleado
{
    public function getSueldo(): float
    {
        // Sueldo base + 15%
        return parent::getSueldo() * 1.15;
    }
}
