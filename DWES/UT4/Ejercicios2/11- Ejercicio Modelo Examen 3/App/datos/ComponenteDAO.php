<?php
require_once __DIR__ . '/../entidades/Componente.php';
interface ComponenteDAO
{
    public function listAll(): ?array;
    public function save(Componente $componente): ?Componente;
    public function update(int $id, Componente $componente): ?Componente;
    public function delete(int $id): ?Componente;
    public function sustituirComponente(string $nombreViejo, string $nombreNuevo, float $precio): void;
}
