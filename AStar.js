class AStar {
    constructor(start, target,grid) {
        this.start = start;
        this.target = target;
        this.grid = grid;

        this.openSet = [start];
        this.closedSet = new Set();

        //used to reverse path;
        this.lastNode = start;
    };
    //Manhattan distance 
    getHeuristic(start, end) {
        let newX = Math.abs(start.x - end.x);
        let newY = Math.abs(start.y - end.y);

        return newX + newY;
    }

    findPath () {

        //while theres items in the Queue we keep looking
        while(this.openSet.length) {
            //initialize at 0 because is the first item in the queue;
            let lowestFIndex = 0;
            for(let i = 0; i < this.openSet.length;i++) {

                if(this.openSet[lowestFIndex].f > this.openSet[i].f) {
                    lowestFIndex = i
                }

                //check if a Node in openSet has Lower f than current lowest f
                if(this.openSet[lowestFIndex].f <= this.openSet[i].f) {
                    if(this.openSet[lowestFIndex].h > this.openSet[i].h) {
                        lowestFIndex = i;
                    }
                }
                

            }


            // change current node to be the last checked
            let current =  this.openSet[lowestFIndex];
            this.lastNode = current;


            //check if we have found our targer;

            if(this.target === current) {

                console.log('Target has been found');
                // this.constructPath();
                return;
            }

            //remove from openSet once we have done find
            this.openSet = this.openSet.filter(node => node !== current);
            // current.visited = true;
            this.closedSet.add(current);
            let currentNeighbors = current.getNeighbors(this.grid);

            for(let neighbor of currentNeighbors) {

                //if neighbor is part of closed set, then skip 

                if(this.closedSet.has(neighbor)) continue;

                //possible new g value for the neighbor of current Node;
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
        
        console.log('no path',this.lastNode);
    }


    constructPath () {
        let tempPath = [];
        let currentNode = this.lastNode

        while(currentNode) {
            // tempPath.unshift([currentNode.x,currentNode.y]);
            tempPath.push(currentNode)
            currentNode = currentNode.previous;
        }
        return tempPath.reverse();
    }
}
export default AStar;

