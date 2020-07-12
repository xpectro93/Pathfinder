class RecMaze {
    constructor(grid) {
        this.grid = grid;
    }
    randomNumber(min,max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    step(minX,maxX,minY,maxY) {

        for(let i = minY; i < maxY;i++) {
            for(let j = minX; j < maxX; j++) {
              mtx[i][j] = 1
            }
        }
    }
}
export default RecMaze;