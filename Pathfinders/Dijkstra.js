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
        for ( let i = 0; this.frontier.length; i++) {
            if (this.frontier[lowestDistanceIndex].f > this.openSet[i].f) {
                lowestDistanceIndex = i;
            }
        }
        //remove from frontier

        let current = this.frontier[lowestDistanceIndex];
        
        this.frontier = this.frontier.filter(vertex !== current);

        if(current === this.target) {
            console.log('Target has been found0');
        }
        

        //for each neighbor of the one that got removed;
        //tempDistance = distance of removed + distance(removed+ neighbor)

        //if(tempDistnace < distance of neighbor)
            //then update distance of neight to tempDistance
            // neighbor/prev to removed

    }


}
export default Dijkstra;