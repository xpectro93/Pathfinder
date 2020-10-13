import Grid  from '../Grid.js';
class DFS extends Grid{
    constructor(start, target,grid) {
        super(start,target,grid);

    };

    step() {
        let current = this.openSet[this.openSet.length - 1];
        this.lastVertexVisited = current;

        if ( current === this.target ) {

            return 1;
        }
        this.openSet.pop();

        this.closedSet.add(current);

        let currentNeighbors = current.getNeighbors(this.grid,1,false);

        for(let neighbor of currentNeighbors) { 

            if(this.closedSet.has(neighbor)) continue;


            neighbor.previous = current;
            if(!this.openSet.includes(neighbor)) this.openSet.push(neighbor);

        }

        return current;
    }

};

export default DFS;