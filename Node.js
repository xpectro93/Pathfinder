class Node {
    constructor(x,y, isWall,WIDTH,HEIGHT) {
        this.x = x;
        this.y = y;
        
        //distance from end node;
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
        let moves = [[-1,0],[0,1],[1,0],[0,-1]];

        for (let move of moves) {
            const [r,c] = move;
            let nr = r + this.y;
            let nc = c + this.x;

            if(grid[nr] && grid[nr][nc]!== undefined) {

                //if it is not a wall, then we add this to our valid neighbors array;
                if(!grid[nr][nc].isWall) {

                    this.neighbors.push(grid[nr][nc]);
                }
            }
        }
        
        return this.neighbors
    }

    draw(ctx,col) {
        if(col ==="red") {
            ctx.fillStyle = `rgb(255,0,0)`;
        }else{
            if(this.isWall) {
                ctx.fillStyle = `rgb(0,0,255)`;
            }else {
                ctx.fillStyle = `rgb(0,0,0)`;
            }
        }
        
        // debugger
        ctx.fillRect(this.x * this.width, this.y * this.height, this.width,this.height);
    }

}
export default Node;