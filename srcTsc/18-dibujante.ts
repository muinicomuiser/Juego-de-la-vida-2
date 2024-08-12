export class Dibujante{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
    }
    get color(): string{
        return this.color;
    }
    set color(color: string){
        this.color = color;
    }
    


}