class Juego{
    constructor(canvas, reticula){
        this.canvas = canvas;        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.offsetLeft = this.canvas.offsetLeft;
        this.offsetTop = this.canvas.offsetTop;
        this.anchoCelda = reticula.anchoCelda;
        this.celdasPorLado = reticula.celdasPorLado;
        this.grosorBorde = reticula.grosorBorde;
        this.colorBorde = reticula.colorBorde;
        this.colorMuerta = reticula.colorMuerta;
        this.colorViva = reticula.colorViva;
        this.context;
        this.contador = 0;
        this.fps = 1;
        this.play = false;
        this.celulasActuales = [];
        this.celulasSiguientes = [];        
        this.crearCelulas(this);        
        this.mouse = {
            x: 0,
            y: 0,
        };
        window.addEventListener("click", (event) => {
            this.mouse.x = event.pageX - this.offsetLeft;
            this.mouse.y = event.pageY - this.offsetTop;
            this.cambiarEstadoClick(this.context);
        })
        window.addEventListener("keyup", (event) => {
            if(event.code == "Space"){
                this.turnoNuevo(this.context)
            }
        })
    }
    crearCelulas(juego){
        for(let col = 0; col < this.celdasPorLado; col++){
            let filaActual = [];
            let filaSiguiente = [];
            for(let fil = 0; fil < this.celdasPorLado; fil++){
                let celulaAc = new Celula(juego);
                celulaAc.x = this.anchoCelda*col;
                celulaAc.y = this.anchoCelda*fil;
                filaActual.push(celulaAc);
                let celulaSig = new Celula(juego);
                celulaSig.x = this.anchoCelda*col;
                celulaSig.y = this.anchoCelda*fil;
                filaSiguiente.push(celulaSig);
            }
            this.celulasActuales.push(filaActual);
            this.celulasSiguientes.push(filaSiguiente);
        }
    }
    trazarBorde(context){        
        if(this.grosorBorde > 0){
            for(let col = 0; col < this.celdasPorLado; col++){
                for(let fil = 0; fil < this.celdasPorLado; fil++){
                    context.beginPath();
                    context.lineWidth = this.grosorBorde;
                    context.rect(this.anchoCelda*col, (this.anchoCelda)*fil, this.anchoCelda, this.anchoCelda);
                    context.strokeStyle = this.colorBorde;
                    context.stroke();
                }
            }
        }        

    }
    pintarJuego(context){
        context.clearRect(0, 0, this.width, this.height);
        for(let col = 0; col < this.celdasPorLado; col++){
            for(let fil = 0; fil < this.celdasPorLado; fil++){
                this.celulasActuales[col][fil].pintarCelula(context);               
            }
        }               
        this.trazarBorde(context);
        this.context = context;  
    }
    cambiarEstadoClick(context){
        if(this.mouse.x > 0 && this.mouse.x <= this.width && this.mouse.y > 0 && this.mouse.y <= canvas.height){
            let idCol = Math.floor(this.mouse.x / this.anchoCelda);
            let idFil = Math.floor(this.mouse.y / this.anchoCelda);
            this.celulasActuales[idCol][idFil].alive = !this.celulasActuales[idCol][idFil].alive;     
            this.celulasSiguientes[idCol][idFil].alive = !this.celulasSiguientes[idCol][idFil].alive;     
            this.celulasActuales[idCol][idFil].pintarCelula(context);
        }
    }
    turnoNuevo(context){
        for(let col = 0; col < this.celdasPorLado; col++){
            for(let fil=0; fil < this.celdasPorLado; fil++){
                this.contarVecinos(col, fil);
                if(this.celulasActuales[col][fil].alive != this.reglasJuego(col, fil)){
                    this.celulasSiguientes[col][fil].alive = this.reglasJuego(col, fil);
                    this.celulasSiguientes[col][fil].pintarCelula(context);
                }
            }
        }
        this.actualizarCelulas();
    }
    contarVecinos(idCol, idFil){
        if(this.celulasActuales[idCol][idFil].alive){
            this.celulasActuales[idCol][idFil].vecinos -= 1;
        }
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(idCol + i >= 0 && idCol + i < this.celdasPorLado && idFil + j >= 0 && idFil + j < this.celdasPorLado){
                    if(this.celulasActuales[idCol + i][idFil + j].alive){
                        this.celulasActuales[idCol][idFil].vecinos += 1;
                    }
                }
            }
        }
    }
    reglasJuego(idCol, idFil){
        if(this.celulasActuales[idCol][idFil].vecinos == 3){
            return true;
        }
        else if(this.celulasActuales[idCol][idFil].vecinos == 2){
            return this.celulasActuales[idCol][idFil].alive;
        }
        else if(this.celulasActuales[idCol][idFil].vecinos < 2 || this.celulasActuales[idCol][idFil].vecinos > 3){
            return false;
        }
    }
    actualizarCelulas(){
        for(let col = 0; col < this.celdasPorLado; col++){
            for(let fil=0; fil < this.celdasPorLado; fil++){
                this.celulasActuales[col][fil].alive = this.celulasSiguientes[col][fil].alive;
                this.celulasActuales[col][fil].vecinos = 0;
            }
        }
    }
    actualizarBorde(){
        for(let col = 0; col < this.celdasPorLado; col++){
            for(let fil=0; fil < this.celdasPorLado; fil++){
                this.celulasActuales[col][fil].borde = this.grosorBorde;
                this.celulasSiguientes[col][fil].borde = this.grosorBorde;
            }
        }
    }
}