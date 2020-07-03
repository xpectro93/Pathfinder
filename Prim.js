import { isValidLocation } from './helper.js';

class Prim {
    constructor(randomVertex,grid) {
        // 1. Start with a grid full of walls.
        this.grid = grid;
        this.frontier = [];
        this.visited = [];
        this.start = randomVertex;

    }
    getDistance (a,b) {
        return Math.hypot(b.x - a.x, b.y - a.y);
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

        this.frontier.push(...this.start.primNeighbors(this.grid,2,true));
      while(this.frontier.length) {
        let randomIdx = Math.floor(Math.random() * this.frontier.length);

        let currentWall = this.frontier[randomIdx];

        let n = currentWall.primNeighbors(this.grid,2,false);

        if(n.length === 1) {
            
            currentWall.isWall = false;
            currentWall.draw(ctx, "pink")
            let d = this.connectionDirection(currentWall,n[0]);
            let posX = currentWall.x + d[0]
            let posY = currentWall.y + d[1] 
            if(isValidLocation(this.grid,posY,posX)) {
                let connection = this.grid[posY][posX];
                connection.isWall = false;
                connection.draw(ctx,"pink");
                this.frontier.push(...connection.primNeighbors(this.grid,2,true));
            }
            
            
        }

        this.frontier.splice(randomIdx,1);
      }
      debugger;
      
        
    }
}


export default Prim;


// While there are walls in the list:
// Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
// Make the wall a passage and mark the unvisited cell as part of the maze.
// Add the neighboring walls of the cell to the wall list.
// Remove the wall from the list.

// http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm