'use strict';
const $taller=(function(){
let data=[
        { vehiculoId: 1, matricula: "1234ABC", marca: "Seat", modelo: "Ibiza", kilometros: 72000, precio: 8500 },
        { vehiculoId: 2, matricula: "5678XYZ", marca: "Ford", modelo: "Focus", kilometros: 98000, precio: 9100 },
        { vehiculoId: 3, matricula: "1111BBB", marca: "Seat", modelo: "León", kilometros: 35000, precio: 14500 },
        { vehiculoId: 4, matricula: "2222CCC", marca: "Toyota", modelo: "Yaris", kilometros: 41000, precio: 12800 },
        { vehiculoId: 5, matricula: "3333DDD", marca: "Ford", modelo: "Fiesta", kilometros: 64000, precio: 7800 },
        { vehiculoId: 6, matricula: "4444EEE", marca: "Peugeot", modelo: "308", kilometros: 55000, precio: 10200 },
        { vehiculoId: 7, matricula: "5555FFF", marca: "Toyota", modelo: "Corolla", kilometros: 83000, precio: 11700 },
        { vehiculoId: 8, matricula: "6666GGG", marca: "Seat", modelo: "Ateca", kilometros: 29000, precio: 18900 },
        { vehiculoId: 9, matricula: "7777HHH", marca: "Ford", modelo: "Puma", kilometros: 46000, precio: 13200 },
        { vehiculoId: 10, matricula: "8888JJJ", marca: "Peugeot", modelo: "208", kilometros: 87000, precio: 9400 }
];

function filtrarMarca(marca){
    let lista = []
    if(marca===null||marca===""){
        return console.log('La marca introducida no es valida');
    }
    
    for(let i = 0;i<data.length;i++){
        if(data[i].marca===marca){
            lista[lista.length]=data[i];
        }
    }
    //if(lista.length===0){
        // return console.log('No se han encontrado coches de esa marca');
    // }
    return lista;
};

function filtrarImporte(minimo,maximo){
    let lista = []
    if(minimo<0|| minimo===null||maximo===null){
        return console.log('Los valores introducidos no son validos');
    }

    for(let i = 0;i<data.length;i++){
        if(data[i].precio<maximo && data[i].precio>minimo){
            lista[lista.length]=data[i];
        }
    }

   return lista;
 };

 function ordenarKms(){
    let lista = []
    for(let i = 0;i<data.length;i++){
        lista[lista.length]=data[i];

    }
    for(let i = 0;i<data.length;i++){
        // console.log(lista[i]);
        for(let j = i+1;j<data.length-1;j++){
            if(data[i].kilometros<data[j].kilometros){
                let temp = lista[i]
                lista[i]=lista[j];
                lista[j]=temp;
             }
            
        }
    }
    return lista;
 };

return{
    filtrarMarca,
    filtrarImporte,
    ordenarKms,
};
})();



console.log('Filtrado por marca Seat\n');
//Lista Marca
let listaMarca = $taller.filtrarMarca("Seat")
if(listaMarca.length!==0){for(let obj of listaMarca){
    console.log(obj)
}}else{
    console.log('No se han encontrado coches de esa marca')
}

console.log('Filtrado por importe mayor que 10.000€ menor que 20.000€\n');

//Filtrar Importe
let listaImporte = $taller.filtrarImporte(10000,20000)
if(listaImporte.length!==0){for(let obj of listaImporte){
    console.log(obj)
}}else{
    console.log('No se han encontrado coches en ese rango de precio')
}

console.log('Ordenado por kilometros\n');
let listaKilometros = $taller.ordenarKms()
for(let obj of listaKilometros){
    console.log(obj)
}