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
    prim.frontier.push(...prim.start.getNeighbors(prim.grid,2,true));
    
    let drawMaze = setInterval(()=> {
        if(!prim.frontier.length) {
            clearInterval(drawMaze);
        }
        prim.step();
        // debugger
        prim.currentWall ? prim.currentWall.draw(ctx,"white"):null;
        prim.connection.draw(ctx,"white");
    },1)
}

export function recHelper ( matrix, ctx) {
    if(!matrix.length) return;

    let rec = new RecMaze(matrix);
    rec.step(0,matrix.length,0,matrix.length);
    rec.grid.forEach(row => {
        row.forEach(v => {
            if(v.isWall) v.draw(ctx,"cyan")
        })
    })
}