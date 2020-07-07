import Prim from "../Mazes/Prim.js";


export function primHelper (matrix,ctx) {
    const randomVertexX = Math.floor(Math.random() * matrix.length);
    const randomVertexY = Math.floor(Math.random() * matrix.length);
    const randomVertex = matrix[randomVertexX][randomVertexY];

    
    let prim = new Prim(randomVertex, matrix);
    prim.start.isWall = false;
    prim.start.draw(ctx,"white");
    prim.frontier.push(...prim.start.getNeighbors(prim.grid,2,true));
    
    let drawMaze = setInterval(()=> {
        if(!prim.frontier.length) {
            console.log("finished")
            clearInterval(drawMaze);
        }
        prim.step();
        // debugger
        prim.currentWall ? prim.currentWall.draw(ctx,"white"):null;
        prim.connection.draw(ctx,"white");
    },1)
}