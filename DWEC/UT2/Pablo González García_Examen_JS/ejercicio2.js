'use strict';
function  dibujarDiagonales(n){
    let figura = [];
    if(isNaN(n)||n%2===0||n<0){
        return figura;
    }
    
    for(let i = 0;i<n;i++){
        let linea="";
        for(let j =0;j<n;j++){
            if(i===j || i+j===n-1){
                linea+="X";
            }
            linea+=" ";
        }
        figura.push(linea);
    }
    return figura;
}

console.log(dibujarDiagonales(7));