import { isValidLocation } from './helper.js';

class Prim {
    constructor(randomVertex,grid) {
        // 1. Start with a grid full of walls.
        this.grid = grid;
        this.frontier = [];
        this.visited = [];
        this.start = randomVertex;

    }

    connectionDirection (randomWall, vertex) {
        let x = randomWall.x - vertex.x;
        let y = randomWall.y - vertex.y;
        //top
        if(x === 0 && y === -2) {
            return [0,-1];
        }
        //down
        if(x === 0 && y === 2) {
            return [0,1];
        }
        // left
        if(x === -2 && y === 0) {
            return [-1, 0];
        }
        //right
        if(x === 2 && y === 0) {
            return [1,0]
        }
    }

    step(ctx) {
        this.start.isWall = false;
        this.start.draw(ctx,"white")
        this.frontier.push(...this.start.getNeighbors(this.grid,2,true));
        while(this.frontier.length) {

            let randomIdx = Math.floor(Math.random() * this.frontier.length);
            let currentWall = this.frontier[randomIdx];

            let n = currentWall.getNeighbors(this.grid,2,false);

            if(n.length === 1) {
                
                currentWall.isWall = false;
                currentWall.draw(ctx, "white")
                let d = this.connectionDirection(currentWall,n[0]);
                let posX = n[0].x + d[0]
                let posY = n[0].y + d[1] 
                if(isValidLocation(this.grid,posY,posX)) {
                    let connection = this.grid[posY][posX];
                    connection.isWall = false;
                    connection.draw(ctx,"white");
                    this.frontier.push(...currentWall.getNeighbors(this.grid,2,true));
                }
                
                
            }
            this.frontier.splice(randomIdx,1);

            
        }
      
        
    }
}


export default Prim;
