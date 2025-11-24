<?php

namespace App\Clases;

use App\Interfaces\InterfazGeneradorPassword;

class AdaptadorGeneradorPassword implements InterfazGeneradorPassword
{
    public function generar(array $opciones): string
    {
        return GeneradorPassword::generar($opciones);
    }
}
