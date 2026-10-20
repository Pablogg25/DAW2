<?php

class Monedero{
    private float $dinero;
    private static int $numero_monederos;

    public function __construct($dinero){
        $this->dinero = $dinero;
        $this::$numero_monederos++;
    }
    
        
    public function meterDinero($aumento){
        $this->dinero = $this->dinero+$aumento;
    }

    public function sacarDinero($resta){
        $this->dinero = $this->dinero-$resta;
    }

    public function getDinero(){
        return $this->dinero;
    }
}