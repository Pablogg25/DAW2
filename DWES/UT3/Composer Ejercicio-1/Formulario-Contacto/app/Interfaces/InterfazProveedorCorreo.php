<?php

namespace App\Interfaces;

interface InterfazProveedorCorreo{
    public function enviarCorreo(string $paraQuien, string $asunto, string $cuerpoMensaje):bool;
};