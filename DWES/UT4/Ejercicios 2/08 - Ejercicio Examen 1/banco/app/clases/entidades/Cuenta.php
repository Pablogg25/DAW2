<?php

class Cuenta{
    public function __construct(
        public int $id,
        public string $iban,
        public string $titular,
        public float $saldo,
        public string $estado,
        public string $createdAt,
    ){}
}

?>