import { isValidLocation } from "./helper.js"
class Node {
    // WIDTH and HEIGHT are their pixel dimensions based on grid size;
    constructor(x,y, isWall,WIDTH,HEIGHT) {
        this.x = x;
        this.y = y;
        
        //distance from end node;
        //decided by heuristic function on A* file
        this.h = 0;
        //distance from starting node;
        this.g = 0;
        
        // f = g + h
        this.f = 0;

        this.width = WIDTH;
        this.height = HEIGHT;
        this.isWall = isWall;
        this.neighbors = [];
        this.previous;
    }


    //grid is the matrix of Nodes
    getNeighbors (grid) {
        //This could be a property of the class?
        let moves = [[-1,0],[0,1],[1,0],[0,-1]];

        for (let move of moves) {

            const [row,col] = move;
            let nr = row + this.y;
            let nc = col + this.x;

                //if it is not a wall, then we add this to our valid neighbors array;
                if(isValidLocation(grid,nr,nc) && !grid[nr][nc].isWall) {

                    this.neighbors.push(grid[nr][nc]);
                }
        }
        
        return this.neighbors
    }
    draw(ctx,color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x * this.width, this.y * this.height, this.width,this.height);
        
    }

}
export default Node;