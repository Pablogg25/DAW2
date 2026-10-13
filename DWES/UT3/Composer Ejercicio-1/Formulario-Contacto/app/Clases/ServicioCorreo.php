<?php

namespace App\Clases;

use App\Interfaces\InterfazProveedorCorreo;

class ServicioCorreo
{
    private InterfazProveedorCorreo $proveedor;

    public function __construct(InterfazProveedorCorreo $proveedor)
    {
        $this->proveedor = $proveedor;
    }

    public function enviarCorreo(string $paraQuien, string $asunto, string $cuerpoMensaje) {
        return $this->proveedor->enviarCorreo($paraQuien,$asunto,$cuerpoMensaje);
    }
};
