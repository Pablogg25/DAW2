<?php
enum turno
{
    case MAÑANA;
    case  TARDE;
};
abstract class Medico
{
    private string $nombre;
    private turno $turno;

    function __construct($nombre, $turno)
    {
        $this->nombre = $nombre;
        $this->turno = $turno;
    }
}
