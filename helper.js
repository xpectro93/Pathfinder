import Vertex from '/Vertex.js';
import { primHelper } from './Helpers/mazeHelper.js'

export const isValidLocation = (mtx, y,x) =>  mtx[y] && mtx[y][x]!== undefined;

export function createBoard (ctx,size,scale,algoType) {
    let newDrawingGrid = [];
    for (let y = 0; y < scale; y++) {
        let drawingRow = [];
        for (let x = 0; x < scale; x++) {
            
            let vertex = new Vertex(x,y,size);
            ctx.strokeStyle = "rgb(24,24,24)"
            ctx.strokeRect(x * size, y * size, size, size);

            if(algoType === "prim") {
                vertex.isWall = true;
                vertex.draw(ctx,"rgb(24,24,24)")
            }
            
            drawingRow.push(vertex);

        }
        newDrawingGrid.push(drawingRow);
    }

    if(algoType === "prim")  primHelper(newDrawingGrid,ctx);

    return newDrawingGrid;
}


export function drawInstructions (ctx,w) {
    let instructions = [
                        "INSTRUCTIONS",
                     "1. Pick Grid size",
                     "2. Draw walls",
                     "3. Pick a starting position",
                     "4. Pick a target position",
                     "5. Click 'Draw Path'",
                     "6. Enjoy :)"];
    let fontSize = (w/100) * 6;
    ctx.fillStyle = "rbg(24,24,24)";
    ctx.font = `bold ${fontSize}px  Helvetica Neue`;
    ctx.textAlign = "center";
    let rowSpace = w / instructions.length + 1;
    for(let i = 0; i < instructions.length; i++) {
        ctx.fillText(instructions[i], w/2,(rowSpace*i )+ i);
    }
    
};

export function drawNoPath (ctx,size) {
    ctx.fillStyle = "white";
    ctx.font = `${(size/100) * 6}px Helvetica Neue`;
    ctx.textAlign = "center";
    ctx.fillText("No Path Available", (size / 2),size/2);
}

export function changePixelType (ctx, type, pixel) {
    if( type === "start" ) {
        pixel.draw(ctx,"blue");    
    }
    else if(type === "end") {
        pixel.draw(ctx,"red");
    }
    return pixel
}


