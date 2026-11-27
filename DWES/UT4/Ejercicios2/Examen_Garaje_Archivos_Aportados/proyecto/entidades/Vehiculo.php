<?php
class Vehiculo
{
    public function __construct(
        public int $id,
        public string $nombre,
        public float $precio
    ) {}
}
