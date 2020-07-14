class RecMaze {
    constructor(grid) {
				this.grid = grid;
				this.step = this.step.bind(this);
    }
    avg(min,max) {
      return Math.floor((min + max) / 2);
    }
    randomNumber(min,max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //1 is vertical else is horizontal
    step (mid, z1,z2, dir) {
      const { grid } = this;
      let checkOne = false;
      let checkTwo = false;
      let max = z2 - 1;
      let min =  z1 + 1;
      let walls = [];
      let rand = this.randomNumber(min,max);
      
      if(dir === 1) {
        if (!grid[z2][mid].isWall){
          rand = max;
          checkOne = true;
        }
        if (!grid[z1][mid].isWall){
          rand = min;
          checkTwo = true;
        }
        
      }
      else {
        if (!grid[mid][z2].isWall){
          rand = max;
          checkOne = true;
        }
        if (!grid[mid][z1].isWall){
          rand = min;
          checkTwo = true;
        }

      }
      for (let i = z1 + 1; i < z2; i++){
        if (checkOne && checkTwo){
          if (i == max || i == min) continue;
        }
        else if (i == rand) continue;

        if(dir === 1){ 
          grid[i][mid].isWall = true
          walls.push(grid[i][mid])
        }
        else {
          grid[mid][i].isWall = true
          walls.push(grid[mid][i])
        };
       
      }
      return walls;

    }

    
}
export default RecMaze;

