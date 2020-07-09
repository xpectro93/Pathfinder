class Dijkstra {
    constructor(start, target, grid) {
        this.start = start;
        this.target = target;
        this.grid = grid;

        this.frontier = [start];
        this.visited = new Set();
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
        for ( let i = 0;i < this.frontier.length; i++) {
            if (this.frontier[lowestDistanceIndex].f > this.frontier[i].f) {
                lowestDistanceIndex = i;
            }
        }
        //remove from frontier

        let current = this.frontier[lowestDistanceIndex];
        
        
        
        
        if(current === this.target) {
            console.log('Target has been found');
            return current;
        }
        this.frontier = this.frontier.filter(vertex=> vertex !== current);
        this.visited.add(current);

        let currentNeighbors = current.getNeighbors(this.grid, 1, false);

         //for each neighbor of the one that got removed;
        //tempDistance = distance of removed + distance(removed+ neighbor)
        for(let neighbor of currentNeighbors) { 

            if(this.visited.has(neighbor)) continue;

            let tempDistance = current.f + this.getHeuristic(current, neighbor);
            
            if(tempDistance < neighbor.f || !this.frontier.includes(neighbor)) {
                neighbor.f = tempDistance;
                neighbor.previous = current;
            };
            if(!this.frontier.includes(neighbor)) this.frontier.push(neighbor);

        }


    }
    constructPath (last) {
        let tempPath = [];
        let currentVertex = last

        //traverse through "linkedList"
        while(currentVertex) {
            tempPath.push(currentVertex)
            currentVertex = currentVertex.previous;
        }
        return tempPath.reverse();
    }


}
export default Dijkstra;