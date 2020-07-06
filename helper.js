import Prim from "./Prim.js";
import Node from '/Node.js';
export function isValidLocation (mtx, y,x) {
    return   mtx[y] && mtx[y][x]!== undefined
}

export function createBoard (ctx,size,scale,algoType) {
    let newDrawingGrid = [];
    for (let y = 0; y < scale; y++) {
        let drawingRow = [];
        for (let x = 0; x < scale; x++) {
            let node;
            //x,y,w,h
            ctx.strokeStyle = "black"
            ctx.strokeRect(x * size, y * size, size, size);
            if(algoType === "prim") {
                console.log(algoType)
             node = new Node(x,y,size,true);
                node.draw(ctx,"black")
            }
            else {
             node = new Node(x,y,size,false);
            }
            
            drawingRow.push(node);

        }
        newDrawingGrid.push(drawingRow);
    }
    if(algoType === "prim") {
        
        let randomNodeX = Math.floor(Math.random() * newDrawingGrid.length);
        let randomNodeY = Math.floor(Math.random() * newDrawingGrid.length);
        let randomNode = newDrawingGrid[randomNodeX][randomNodeY];
        
        let newPrim = new Prim(randomNode, newDrawingGrid);
        newPrim.step(ctx);
    }
    return newDrawingGrid;
}


export function drawInstructions (ctx,w) {
    let instructions = ["filler",
                        "INSTRUCTIONS",
                     "1. Pick Grid size",
                     "2. Draw walls",
                     "3. Pick a starting position",
                     "4. Pick a target position",
                     "5. Click 'Draw Path'",
                     "6. Enjoy :)"];
    let fontSize = 35;
    ctx.fillStyle = "black";
    ctx.font = `bold ${fontSize}px  Helvetica Neue`;
    ctx.textAlign = "center";
    let rowSpace = w / instructions.length + 1;
    for(let i = 0; i < instructions.length; i++) {
        ctx.fillText(instructions[i], w/2,rowSpace*i);
    }
    
};

export function drawNoPath (ctx,size) {
    ctx.fillStyle = "white";
    ctx.font = `50px Helvetica Neue`;
    ctx.textAlign = "center";
    ctx.fillText("No Path Available", (size / 2),size/4);
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


