<?php
 function parImpar($numero){
    if($numero%2===0){
         echo 'Par';
    };
    echo 'Impar';
}
$numero = 6;
echo parImpar($numero);
?>