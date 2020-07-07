import { isValidLocation } from '../helper.js';

class Prim {
    constructor(randomVertex,grid) {
        // 1. Start with a grid full of walls.
        this.grid = grid;
        this.frontier = [];
        this.visited = [];
        this.start = randomVertex;
        this.currentWall;
        this.connection;
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

    step() {

        let randomIdx = Math.floor(Math.random() * this.frontier.length);

        this.currentWall = this.frontier[randomIdx];
        
        if(!this.currentWall) return;

        let n = this.currentWall.getNeighbors(this.grid,2,false);
        if(n.length === 1) {
            
            this.currentWall.isWall = false;

            let d = this.connectionDirection(this.currentWall,n[0]);
            let posX = n[0].x + d[0]
            let posY = n[0].y + d[1] 

            if(isValidLocation(this.grid,posY,posX)) {
                this.connection = this.grid[posY][posX];
                this.connection.isWall = false;
                this.frontier.push(...this.currentWall.getNeighbors(this.grid,2,true));
            }
            
            
        }
        else  this.currentWall = null;
        
        this.frontier.splice(randomIdx,1);

    }
}


export default Prim;
