import  Grid  from '../Grid.js';
class Dijkstra extends Grid{
    constructor(start, target, grid) {
        super(start, target, grid);

        this.start.f = 0;
    };
    step () {        
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
}
export default Dijkstra;