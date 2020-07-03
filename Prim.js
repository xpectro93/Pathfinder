class Prim {
    constructor(randomVertex,grid) {
        // 1. Start with a grid full of walls.
        this.grid = grid;
        this.frontier = [randomVertex];
        this.visited = [];

    }
    getDistance (a,b) {
        return Math.hypot(b.x - a.x, b.y - a.y);
    }

    connectionDirection (randomFrontier, vertex) {
        let x = randomFrontier.x - vertex.x;
        let y = randomFrontier.y - vertex.y;
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
        //mark random
        
    //   let start = this.frontier[0];
    //   let neighbors = start.primNeighbors(this.grid);
    //   start.draw(ctx,"red");
    //   this.visited.add(start);
    //   this.frontier.push(...neighbors);
    //   this.frontier.splice(0,1);

      while(this.frontier.length) {
        let randomIdx = Math.floor(Math.random() * this.frontier.length);
        // debugger
        let current = this.frontier.splice(randomIdx,1);
        current = current.pop();
        current.draw(ctx,"red")
        this.visited.push(current);

        let n = current.primNeighbors(this.grid);
        this.frontier.push(...n);

        let randFrontier =  this.frontier[Math.floor(Math.random() * this.frontier.length)];

        this.frontier.forEach(thing => thing.draw(ctx, "blue"));
        randFrontier.draw(ctx,"cyan");

        this.visited.forEach(vertex => {
          let distance =   this.getDistance(vertex, randFrontier);
          if(distance <= 2) {
              let direction = this.connectionDirection(randFrontier, vertex);
              this.grid[vertex.y + direction[1]][vertex.x + direction[0]].isWall = false;
              
          }
        })


         break

            // random vertex
            // -- frontier is part of maze
            // add  neighbors to frontier array;
            //pick random cell from frontier;
            //connect to the  cell that is already part of the maze(pathSet)
            // add the neighbors from the random 
      }
        
    }
}


export default Prim;


// While there are walls in the list:
// Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
// Make the wall a passage and mark the unvisited cell as part of the maze.
// Add the neighboring walls of the cell to the wall list.
// Remove the wall from the list.

// http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm