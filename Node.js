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
        this.height = WIDTH;
        this.isWall = isWall;
        this.previous;
    }

    isClicked (mouseX, mouseY) {
        let pixelX = this.x * this.width;
        let pixelY = this.y * this.height;

       let leftRight =( mouseX > pixelX) && (mouseX < (pixelX + this.width));

       let topBottom = (mouseY > pixelY) && (mouseY < (pixelY + this.width));
       return topBottom && leftRight;
    }
    // clicked(mx,my) {
    //     let px = this.x * this.w;
    //   let py = this.y * this.w;
    //     return( mx > px && ( mx < px + this.w)) && ( my > py && ( my < py + this.w))  
    // }

    //grid is the matrix of Nodes
    getNeighbors (grid) {
        //This could be a property of the class?
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
    draw(ctx,color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x * this.width, this.y * this.height, this.width,this.height);
        
    }

}
export default Node;