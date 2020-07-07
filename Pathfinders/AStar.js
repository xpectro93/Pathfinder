class AStar {
    constructor(start, target,grid) {
        this.start = start;
        this.target = target;
        this.grid = grid;

        this.openSet = [start];
        //O(1);
        this.closedSet = new Set();

        //used to create path;
        this.lastVertexVisited = start;
    };
    //Manhattan distance 
    getHeuristic(start, end) {
        let newX = Math.abs(start.x - end.x);
        let newY = Math.abs(start.y - end.y);

        return newX + newY;
    }

    step () {


        //initialize at 0 because is the first item in the queue;
        let lowestFIndex = 0;
        for(let i = 0; i < this.openSet.length;i++) {

            //TODO:Change this to priority queue/minhheap for O(1) lookup

            //check if a vertex in openSet has Lower f than current lowest f
            if(this.openSet[lowestFIndex].f > this.openSet[i].f) {
                lowestFIndex = i
            }

            //If F values are tied check manhattan distance;-
            //if distance of end vertex is shorter. It becomes new lowest F 
            if(this.openSet[lowestFIndex].f === this.openSet[i].f) {
                if(this.openSet[lowestFIndex].h > this.openSet[i].h) {
                    lowestFIndex = i;
                }
            }
            

        }


        //change lastVertexVisited to be the current vertex
        let current =  this.openSet[lowestFIndex];
        this.lastVertexVisited = current;


        
        //check if we have found our target;
        if(this.target === current) {

            console.log('Target has been found');
            //Break out of function once target is found;
            return 1;
        }

        //remove from openSet once we have done find
        this.openSet = this.openSet.filter(vertex => vertex !== current);

        this.closedSet.add(current);
        let currentNeighbors = current.getNeighbors(this.grid,1, false);

        for(let neighbor of currentNeighbors) {

            //if neighbor is part of closed set, then skip 
            if(this.closedSet.has(neighbor)) continue;

            //possible new g value for the neighbor of current vertex;
            let tempG = current.g + this.getHeuristic(current, neighbor);

            //check if new path to neighbor is shorter OR if neighbor has never been visited.
            // so we can their g and h values
            if(tempG < neighbor.g || !this.openSet.includes(neighbor)) {

                //update g, h, f values
                neighbor.g = tempG;
                neighbor.h = this.getHeuristic(neighbor, this.target);
                neighbor.f = neighbor.g + neighbor.h;

                //create a link to later use as Linked list to create path
                neighbor.previous = current;

                //add to queue to items to be explored
                if(!this.openSet.includes(neighbor)) this.openSet.push(neighbor);
            }
        };


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
    showPath (ctx) {
        let path = this.constructPath();
        let i = 0;
        let shortestPath = setInterval(() => {
            if(i === path.length - 1) {
                
                clearInterval(shortestPath)
            }
            
            path[i].draw(ctx,"rgb(0, 253, 190)");
            i++
            
        }, 5);
    }
}
export default AStar;

