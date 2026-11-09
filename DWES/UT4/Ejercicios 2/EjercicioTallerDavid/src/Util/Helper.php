<?php
declare(strict_types=1);

class Helper {
    /** Escapa salida HTML para evitar XSS */
    public static function e(string|int|float $valor): string {
        return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
    }

    public static function sanearTexto(string $texto): string {
        return trim(filter_var($texto, FILTER_SANITIZE_SPECIAL_CHARS));
    }

    public static function validarNif(string $nif): string {
        return strtoupper(trim($nif));
    }

    public static function validarMatricula(string $matricula): string {
        return strtoupper(trim($matricula));
    }

    public static function validarPrecio(mixed $precio): float|false {
        $precioNormalizado = str_replace(',', '.', trim((string)$precio));
        return filter_var($precioNormalizado, FILTER_VALIDATE_FLOAT);
    }
}