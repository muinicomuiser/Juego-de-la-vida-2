class Celula{
    constructor(juego){
        this.juego = juego;
        this.borde = this.juego.grosorBorde;
        this.ancho = this.juego.anchoCelda;
        this.x;
        this.y;
        this.alive = false;
        this.colorViva = this.juego.colorViva;
        this.colorMuerta = this.juego.colorMuerta;
        this.vecinos = 0;
    }
    pintarCelula(context){
        context.beginPath();
        if(this.alive){
            context.fillStyle = this.colorViva;
        }
        else{
            context.fillStyle = this.colorMuerta;
        }
        context.rect(this.x + this.borde, this.y + this.borde, this.ancho - this.borde*2, this.ancho - this.borde*2);
        context.fill();
    }
}
