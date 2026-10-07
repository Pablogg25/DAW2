<?php
class Persona
{
    protected $nombre;
    protected $apellidos;
    public function muestra()
    {
        print "<p>" . $this->nombre . "," . $this->apellidos . "</p>";
    }
}
