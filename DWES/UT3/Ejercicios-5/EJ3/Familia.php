<?php
require "Medico.php";
class Familia extends Medico
{
    private int $num_pacientes;
    function __construct($num_pacientes)
    {
        $this->num_pacientes = $num_pacientes;
    }
}
