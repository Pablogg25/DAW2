<?php
class Circulo
{
    private int $radio;

    public function __construct($radio)
    {
        $this->radio = $radio;
    }

    public function getRadio()
    {
        return $this->radio;
    }

    public function setRadio($radio)
    {
        $this->radio = $radio;
    }
}
