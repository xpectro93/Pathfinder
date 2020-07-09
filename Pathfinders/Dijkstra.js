class Dijkstra {
    constructor(start, target, grid) {
        this.start = start;
        this.target = target;
        this.grid = grid;

        this.openSet = [start];
        this.closedSet = new Set();
        this.start.f = 0;
    };
    getHeuristic(start, end) {
        let newX = Math.abs(start.x - end.x);
        let newY = Math.abs(start.y - end.y);

        return newX + newY;
    }

    step () {
        //change start distance to to 0 before loop starts;
        
        //pick vertex with smallest distance 
        let lowestDistanceIndex = 0;
        for ( let i = 0;i < this.openSet.length; i++) {
            if (this.openSet[lowestDistanceIndex].f > this.openSet[i].f) {
                lowestDistanceIndex = i;
            }
        }
        //remove from openSet

        let current = this.openSet[lowestDistanceIndex];
        this.lastVertexVisited = current;
        
        
        
        if(current === this.target) {
            console.log('Target has been found');
            return 1;
        }
        this.openSet = this.openSet.filter(vertex=> vertex !== current);
        this.closedSet.add(current);

        let currentNeighbors = current.getNeighbors(this.grid, 1, false);

         //for each neighbor of the one that got removed;
        //tempDistance = distance of removed + distance(removed+ neighbor)
        for(let neighbor of currentNeighbors) { 

            if(this.closedSet.has(neighbor)) continue;

            let tempDistance = current.f + this.getHeuristic(current, neighbor);
            
            if(tempDistance < neighbor.f || !this.openSet.includes(neighbor)) {
                neighbor.f = tempDistance;
                neighbor.previous = current;
            };
            if(!this.openSet.includes(neighbor)) this.openSet.push(neighbor);

        }

        return current


    }
    constructPath () {
        let tempPath = [];
        let currentVertex = this.lastVertexVisited

        //traverse through "linkedList"
        while(currentVertex) {
            tempPath.push(currentVertex)
            currentVertex = currentVertex.previous;
        }
        return tempPath.reverse();
    }


}
export default Dijkstra;