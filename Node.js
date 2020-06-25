class Node {
    constructor(x,y, isWall) {
        this.x = x;
        this.y = y;

        this.f = 0;
        this.h = 0;
        this.g = 0;
        this.w = WIDTH/28;
        this.h = HEIGHT/ 31;
        this.isWall = isWall;
        this.neighbors = [];
    }

    addNeighbors (grid) {
        let moves = [[-1,0],[0,1],[1,0],[0,-1]];

        for (let move in moves) {
            const [r,c] = move;
            let nr = r + this.y;
            let nc = c + this.x;

            if(grid[nr] && grid[nr][nc]!== undefined) {
                if(!grid[nr][nc].isWall) {
                    this.neighbors.push(grid[nr][nc]);
                }
            }
        }
        
        
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
        
        
        ctx.fillRect(this.x * this.w, this.y * this.h, this.w,this.h);
    }

}
export default Node;