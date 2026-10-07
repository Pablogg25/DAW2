<?php
class Persona
{
    // Puedes agregar propiedades y métodos aquí si lo necesitas
}

class Alumno extends Persona
{
    private $notas;

    function __construct($notas)
    {
        $this->notas = $notas;
    }
}
$nota = 10;
$alumno = new Alumno($nota);
//$isPersona = $alumno instanceof Persona;
