<?php
// FOR
for ($i = 0; $i <= 10; $i++) {
    echo 2 * $i . ' ';
}
echo '<br>';
// WHILE
$i = 0;
while ($i <= 10) {
    echo 2 * $i . ' ';
    $i++;
}
echo '<br>';
// DO WHILE
$i = 0;
do {
    echo (2 * $i) . ' ';
    $i++;
} while ($i <= 10);
