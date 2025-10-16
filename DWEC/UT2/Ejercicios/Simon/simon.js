const simon = (function(){
    const colores = ["verde","rojo","azul","amarillo"];
    let secuencia = [];
    let posicion = 0;
    let racha = 0;
    let jugando = false;

    // Funcion que devuelve la secuencia que se va a mostrar
    function getSecuencia(){
        return secuencia;
    }

    // Funcion que devuelve el ultimo color pulsado 
    function establecerColorPulsado(){
    if(!jugando) return;
    if(color === secuencia[posicion]){
        posicion++;
    }
    if(posicion===secuencia.length){
        // Ronda completada
        mejorRacha = Math.max(mejorRacha, secuencia.length);
        posicion = 0;
        jugando = false;
        setTimeout(nuevaRonda, 1000);
    }else{
        alert("¡Fallaste");
        secuencia = [];
        posicion = 0;
        jugando = false;
    }
    }
    

    // Funcion que me devuelve la mejor racha conseguida 
    function getMejorRacha(){
        return mejorRacha;
    }

    // Funcion que devuelve la posicion actual 
    function getPosicion(){
        return posicion;
    }
    // Funcion que inicia el juego para que se empiecen a ver los colores etc...
    function iniciarJuego(){
        secuencia=[];
        posicion=0;
        mejorRacha=mejorRacha;
        nuevaRonda();
    }

    // Funcion que devuelve el estado actual del juego 
    function getEstado(){
    return jugando ? "jugando" : "parado";
    }

    function nuevaRonda(){
        const colorAleatroio = colores[Math.floor(Math.random()*4)]
        secuencia.push(colorAleatroio);
        jugando=false;
        MostrarSecuencia();
    }

// Exposición pública
    return {
        getSecuencia,
        establecerColorPulsado,
        getMejorRacha,
        getPosicion,
        iniciarJuego,
        getEstado
  };
})();

//Interfaz
window.addEventListener("load",()=>{
    const botones = document.querySelector(".color");
    const btnComenzar = document.getElementById("btnComenzar");
    const mejor = document.getElementById("mejorRacha");
    const progreso = document.getElementById("rachaActual");
    const tiempoOn = document.getElementById("tiempoOn");
    const tiempoOff = document.getElementById("tiempoOff");

    let mostrarSecuencia= false;

    function iluminar(color,duracion){
        const btn = document.getElementById(color);
        btn.classList.add("active");
        setTimeout(() => btn.classList.remove("active"), duracion);
    }
}
)