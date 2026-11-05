<?php
declare(strict_types=1);

class Helper{

    public static function limpiaTexto(string $texto):string{
        return mb_strtolower(trim($texto),'UTF-8');
    }

    public static function h(string $texto):string{
        return htmlspecialchars((string)$texto, ENT_QUOTES, 'UTF-8');
    }

}

?>