/**Juego de la Vida de Conway
 * Versión 2
 * Codificación con Clases y Métodos
 */

/**
 * AJUSTES:
 *  Las constantes de canvas y contexto nunca se tocan. Son usadas para crear objetos con los constructores, y las propiedades de los objetos
 *      creados son las que se van modificando.
 *  Reconoce el offset del canvas cuando se cambia el porcentaje del tamaño de la ventana. Modifica las propiedades de offset del objeto creado 
 *      con el constructor de composición, sin intervenir la constante que representa al elemento canvas del html.
 *  También 
 */
//Constantes
const RETICULA = {
    celdasPorLado: 100,
    anchoCelda: 7,
    grosorBorde: 0,
    colorBorde: "black",
    colorMuerta: "black",
    colorViva: "white",

}
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = ladoCanvas(RETICULA);
CANVAS.height = ladoCanvas(RETICULA);
let nuevoJuego;

// Inicio del programa
window.addEventListener("load", () => {
    nuevoJuego = new Juego(CANVAS, RETICULA);
    nuevoJuego.pintarJuego(CONTEXT);    
})
window.addEventListener("resize", () =>{
    nuevoJuego.offsetLeft = CANVAS.offsetLeft;
    nuevoJuego.offsetTop = CANVAS.offsetTop;
})
function ladoCanvas(reticula){
    return reticula.celdasPorLado * reticula.anchoCelda;
}
const checkBorde = document.getElementById("borde");
checkBorde.addEventListener("change", () =>{
    if(checkBorde.checked){
        nuevoJuego.grosorBorde = 1;
        nuevoJuego.actualizarBorde();
        nuevoJuego.pintarJuego(CONTEXT);
    }
    else{
        nuevoJuego.grosorBorde = 0;
        nuevoJuego.actualizarBorde();
        nuevoJuego.pintarJuego(CONTEXT);
    }    
})
const btnTurno = document.getElementById("turno");
btnTurno.addEventListener("click", () => {
    nuevoJuego.turnoNuevo(CONTEXT)
});

const fpsRange = document.getElementById("velocidad");

const btnPlay = document.getElementById("play");
btnPlay.addEventListener("click", ()=>{
    nuevoJuego.play = !nuevoJuego.play;
    nuevoJuego.fps = fpsRange.value;
    if(nuevoJuego.play){
        btnPlay.value = "Pausar";
        }
        else{
            btnPlay.value = "Reproducir"
            }    
    requestAnimationFrame(play);
})

function play(){   
    if(nuevoJuego.play == true){
        console.log(fpsRange.value);
        nuevoJuego.fps = fpsRange.value;
        if(nuevoJuego.contador % (61-nuevoJuego.fps) == 0){        
            nuevoJuego.turnoNuevo(nuevoJuego.context);
        }
        nuevoJuego.contador++;
        requestAnimationFrame(play);
    }
}
