<?php

define("TIPO_DAO", "PDO");

//define("TIPO_DAO", "MEMORIA");    // Cambiar a MEMORIA para usar el DAO en memoria
/* La implementación en memoria no funcionará porque cada vez que hagamos clic en el formulario 
    se creará un nuevo objeto ProductoMemoriaDAO y se perderán los datos insertados anteriormente. 
    Necesitaríamos mantener una única instancia del DAO en memoria para que los datos se conserven y
    para ello necesitaríamos usar sesiones (que aún no hemos visto) */