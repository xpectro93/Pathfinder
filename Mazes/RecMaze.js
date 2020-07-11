class RecMaze {
    constructor(grid) {
        this.grid = grid;
    }
    randomNumber(min,max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    step() {
        if(maxX - maxY < 3 || maxY - minY < 3) return;
    }
}
export default RecMaze;