import { isValidLocation } from "./helper.js"
class Node {
    // WIDTH and HEIGHT are their pixel dimensions based on grid size;
    constructor(x,y,dimension,isWall = false) {
        this.x = x;
        this.y = y;
        
        //distance from end node;
        //decided by heuristic function on A* file
        this.h = 0;
        //distance from starting node;
        this.g = 0;
        
        // f = g + h
        this.f = 0;

        this.dimension = dimension 
        this.isWall = isWall;
        this.previous;
    }

    isClicked (mouseX, mouseY) {
        let pixelX = this.x * this.dimension;
        let pixelY = this.y * this.dimension;

       let leftRight = (mouseX > pixelX) && (mouseX < (pixelX + this.dimension));

       let topBottom = (mouseY > pixelY) && (mouseY < (pixelY + this.dimension));
       return topBottom && leftRight;
    }


    //grid is the matrix of Nodes
    getNeighbors (grid) {
        // Could be a property of the class?
        let moves = [[-1,0],[0,1],[1,0],[0,-1]];
        let neighbors = [];
        for (let move of moves) {

            const [row,col] = move;
            let nr = row + this.y;
            let nc = col + this.x;

                //if it is not a wall, then we add this to our valid neighbors array;
                if(isValidLocation(grid,nr,nc) && !grid[nr][nc].isWall) {

                    neighbors.push(grid[nr][nc]);
                }
        }
        
        return neighbors
    }
    primNeighbors(grid, d, isWall) {
        // Could be a property of the class?
        let moves = [[-d,0],[0,d],[d,0],[0,-d]];
        let neighbors = [];
        for (let move of moves) {

            const [row,col] = move;
            let nr = row + this.y;
            let nc = col + this.x;

                //if it is not a wall, then we add this to our valid neighbors array;
                if(isValidLocation(grid,nr,nc) && (isWall === grid[nr][nc].isWall)) {

                    neighbors.push(grid[nr][nc]);
                }
        }
        
        return neighbors
    }
    draw(ctx,color) {
        const { dimension, x, y } = this;

        ctx.shadowColor = color;
        ctx.shadowBlur = 3
        ctx.fillStyle = color;
        ctx.fillRect(x * dimension, y * dimension, dimension, dimension);
        
    }

}
export default Node;