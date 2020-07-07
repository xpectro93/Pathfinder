import { isValidLocation } from "./helper.js"
class Vertex {
    //x and y is the Vertext position on the matrix(grid)
    // size is the width and the height of the vertex
    //isWall is just a boolean if it is a wall or not
    constructor(x,y,size,isWall = false) {
        this.x = x;
        this.y = y;
        
        //distance from end vertex;
        //decided by heuristic function on A* file
        this.h = 0;
        //distance from starting Vertex;
        this.g = 0;
        
        // f = g + h
        this.f = 0;

        this.size = size 
        this.isWall = isWall;
        this.previous;
    }

    isClicked (mouseX, mouseY) {
        let pixelX = this.x * this.size;
        let pixelY = this.y * this.size;

       let leftRight = (mouseX > pixelX) && (mouseX < (pixelX + this.size));

       let topBottom = (mouseY > pixelY) && (mouseY < (pixelY + this.size));
       return topBottom && leftRight;
    }

    //grid = mtx, d = distance, isWall = boolean
    getNeighbors(grid, d, isWall) {
        // Could be a property of the class?
        let moves = [[-d,0],[0,d],[d,0],[0,-d]];
        let neighbors = [];
        for (let move of moves) {

            const [row,col] = move;
            let nr = row + this.y;
            let nc = col + this.x;

                //if it is or is not a wall, then we add this to our valid neighbors array;
                if(isValidLocation(grid,nr,nc) && 
                  (isWall === grid[nr][nc].isWall)) {

                    neighbors.push(grid[nr][nc]);
                }
        }
        
        return neighbors
    }
    draw(ctx,color) {
        const { size, x, y } = this;
        ctx.fillStyle = color;
        ctx.fillRect(x * size, y * size, size, size);
        
    }

}
export default Vertex;