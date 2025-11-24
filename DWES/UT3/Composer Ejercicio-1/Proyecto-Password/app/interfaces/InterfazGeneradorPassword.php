<?php

namespace App\Interfaces;

interface InterfazGeneradorPassword {
    public function generar(array $opciones):string;
}
