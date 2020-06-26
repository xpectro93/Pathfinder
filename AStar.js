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
    getHeuristic(current, neighbor) {
        let newX = Math.abs(current.x - neighbor.x);
        let newY = Math.abs(current.y - neighbor.y);

        return newX + newY;
    }

    findPath () {

        //while theres items in the Queue we keep looking
        while(this.openSet.length) {
            //initialize at 0 because is the first item in the queue;
            console.log('loop')
            let lowestFIndex = 0;
            for(let i = 0; i < this.openSet.length;i++) {

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
                this.constructPath();
                return;
            }

            this.openSet = this.openSet.filter(node => node !== current);
            this.closedSet.add(current);
            let currentNeighbors = current.getNeighbors(this.grid);

            for(let neighbor of currentNeighbors) {

                //if neighbor is part of closed set, then skip 
                if(this.closedSet.has(neighbor)) continue;

                //possible new g value for the neighbor of current Node;
                let tempG = current.g + this.getHeuristic(current, neighbor);
                if(tempG < neighbor.g || !this.openSet.includes(neighbor)) {

                    neighbor.g = tempG;
                    neighbor.h = this.getHeuristic(neighbor, this.target);
                    neighbor.previous = current;

                    if(!this.openSet.includes(neighbor)) this.openSet.push(neighbor);
                }
            };




        }
        
        console.log('no path');n 
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

