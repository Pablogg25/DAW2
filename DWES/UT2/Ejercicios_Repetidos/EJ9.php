<?php
function parImpar($numero){
    if($numero%2===0) return true;
    return false;
}

$numero = 10;

if(parImpar($numero)){
    echo 'Es par';
}else{
    echo 'Es impar';
}
?>