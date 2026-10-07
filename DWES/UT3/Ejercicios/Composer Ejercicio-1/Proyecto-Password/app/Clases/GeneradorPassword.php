<?php
namespace App\Clases;

use Hackzilla\PasswordGenerator\Generator\ComputerPasswordGenerator;

class GeneradorPassword {
    public static function generar(array $opciones): string {
        $generator = new ComputerPasswordGenerator();

        $generator->setLength($opciones['longitud'] ?? 8);
        $generator->setUppercase($opciones['mayusculas'] ?? false);
        $generator->setLowercase($opciones['minusculas'] ?? false);
        $generator->setNumbers($opciones['numeros'] ?? false);
        $generator->setSymbols($opciones['simbolos'] ?? false);

        return $generator->generatePassword();
    }
}
