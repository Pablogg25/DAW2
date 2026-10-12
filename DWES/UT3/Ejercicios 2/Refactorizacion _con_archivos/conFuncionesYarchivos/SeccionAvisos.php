<?php
    require_once 'logica.php';
?>
<section>
    <h2>Avisos automáticos</h2>
    <ul>
        <?php foreach ($avisos as $aviso): ?>
            <li><?= e($aviso) ?></li>
        <?php endforeach; ?>
    </ul>
</section>