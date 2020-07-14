import Prim from "../Mazes/Prim.js";
import RecMaze from "../Mazes/RecMaze.js";

export function primHelper (matrix,ctx) {
    if(!matrix.length) return;
    const randomVertexX = Math.floor(Math.random() * matrix.length);
    const randomVertexY = Math.floor(Math.random() * matrix.length);
    const randomVertex = matrix[randomVertexX][randomVertexY];


    let prim = new Prim(randomVertex, matrix);
    prim.start.isWall = false;
    prim.start.draw(ctx,"white");
    prim.start.drawLine(ctx,"rgb(24,24,24)");
    prim.frontier.push(...prim.start.getNeighbors(prim.grid,2,true));
    
    let drawMaze = setInterval(()=> {
        if(!prim.frontier.length) {
            clearInterval(drawMaze);
        }
        prim.step();
        if(prim.currentWall){
            prim.currentWall.draw(ctx,"white");
            prim.currentWall.drawLine(ctx,"rgb(24,24,24)");
        }
        prim.connection.draw(ctx,"white");
        prim.connection.drawLine(ctx,"rgb(24,24,24)");
    },1)
}

export function recHelper ( matrix, ctx) {
    if(!matrix.length) return;

    let rec = new RecMaze(matrix);
    
    let minX = 0; 
    let minY = 0;
    let maxX = matrix.length - 1;
    let maxY = matrix.length - 1;

    const recStep = (minX,maxX, minY, maxY) => {
        setTimeout(() => {
            let width = maxX - minX;
            let height =  maxY - minY;
            let walls;
            if(width <= 3 || height <= 3) return;
            if(width >= height) {
                let mid = rec.avg(minX,maxX);
                walls = rec.step(mid,minY,maxY,1); 
                recStep(minX, mid,minY, maxY);
                recStep(mid,maxX,minY, maxY);      
            }
            else {
                let mid = rec.avg(minY,maxY);
                
                walls = rec.step(mid,minX,maxX)
                recStep(minX, maxX,minY, mid);
                recStep(minX, maxX,mid, maxY);   
                }
            walls.forEach(wall => wall.isWall ? wall.draw(ctx,"rgb(24,24,24"): null) 
        },500)
    }

    setInterval(recStep(minX,maxX,minY,maxY),100) 
    
}