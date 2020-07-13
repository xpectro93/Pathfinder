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

    step(x1,x2,y1,y2) {
			const { step } = this;
      let width = x2 - x1;
      let height = y2 - y1;
      

      if(width <= 3 || height <= 3) return;
      if (width >= height){
        let mid = this.avg(x1,x2);

        this.uniStep(mid,y1,y2,1)
        step(x1, mid,y1, y2);
        step(mid, x2,y1, y2);
      }
      else{

        let mid = this.avg(y1,y2);
        
        this.uniStep(mid,x1,x2)
        step(x1, x2,y1, mid);
        step(x1, x2,mid, y2);

    }
    }

    //1 is vertical else is horizontal
    uniStep (mid, z1,z2, dir) {
      const { grid } = this;
      let checkOne = false;
      let checkTwo = false;
      let max = z2 - 1;
      let min =  z1 + 1;
      
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

        if(dir === 1) grid[i][mid].isWall = true;
        else          grid[mid][i].isWall = true;
      }

    }

    
}
export default RecMaze;

