class Grid {
    constructor(start, target,grid) {
        this.grid = grid; 
        this.start = start;
        this.target = target;
        this.openSet = [start];
        this.closedSet = new Set();
    }
    getHeuristic(start, end) {
        let newX = Math.abs(start.x - end.x);
        let newY = Math.abs(start.y - end.y);

        return newX + newY;
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
export default Grid;