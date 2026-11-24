<?php
class Cuenta
{
    public ?int $id;
    public string $iban;
    public string $titular;
    public float $saldo;
    public string $estado;
    public ?string $createdAt;

    public function __construct(
        ?int $id,
        string $iban,
        string $titular,
        float $saldo,
        string $estado = 'ACTIVA',
        ?string $createdAt = null
    ) {
        $this->id = $id;
        $this->iban = $iban;
        $this->titular = $titular;
        $this->saldo = $saldo;
        $this->estado = $estado;
        $this->createdAt = $createdAt;
    }
}
?>