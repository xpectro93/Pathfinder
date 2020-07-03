export function isValidLocation (mtx, y,x) {
    return   mtx[y] && mtx[y][x]!== undefined
}
export function drawInstructions (ctx,w,h) {
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
    let rowSpace = h / instructions.length + 1;
    for(let i = 0; i < instructions.length; i++) {
        ctx.fillText(instructions[i], w/2,rowSpace*i);
    }
    
};

export function changePixelType (ctx, type, pixel) {
    if( type === "start" ) {
        pixel.draw(ctx,"blue");    
    }
    else if(type === "end") {
        pixel.draw(ctx,"red");
    }
    return pixel
}


