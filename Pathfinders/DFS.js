import Grid  from '../Grid.js';
class DFS extends Grid{
    constructor(start, target,grid) {
        super(start,target,grid);

        this.lastVertexVisited = start;
    };

    step() {
        
        let current = this.openSet[0];
        this.lastVertexVisited = current;

        if ( current === this.target ) {
            console.log('Task  completed');
            return 1;
        }
        this.openSet.pop();

        this.closedSet.add(current);

        let currentNeighbors = current.getNeighbors(this.grid,1,false);

        for(let neighbor of currentNeighbors) { 

            if(this.closedSet.has(neighbor)) continue;

            if(!this.openSet.includes(neighbor)) this.openSet.push(neighbor);

        }

        return current;
    }

};

export default DFS;