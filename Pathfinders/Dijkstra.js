class Dijkstra {
    constructor(start, end, grid) {
        this.start = start;
        this.end = end;
        this.grid = grid;

        this.visited = new Set();
        this.toBeVisited = [];
    };
    getHeuristic(start, end) {
        let newX = Math.abs(start.x - end.x);
        let newY = Math.abs(start.y - end.y);

        return newX + newY;
    }

    step () {
        //change start distance to to 0 before loop starts;
        let current = this.openSet[0];


    }


}
export default Dijkstra;