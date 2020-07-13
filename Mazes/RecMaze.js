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

        this.verticalStep(mid,y1,y2);
        step(x1, mid,y1, y2);
        step(mid, x2,y1, y2);
      }
      else{

        let mid = this.avg(y1,y2);
        this.horizontalStep(mid, x1,x2);

        step(x1, x2,y1, mid);
        step(x1, x2,mid, y2);

    }
    }
    horizontalStep(mid,x1,x2) {
      const { grid } = this;
      let max = x2-1;
      let min = x1+1;
      let first  = false;
      let second = false;
      let rand = this.randomNumber(min,max)
      if (!grid[mid][x2].isWall){
        rand = max;
        first = true;
      }
      if (!grid[mid][x1].isWall){
        rand = min;
        second = true;
      }
      for (let i = x1+1; i < x2; i++){
        if (first && second){
          if (i == max || i == min){
            continue;
          }
        }
        else if (i == rand){
          continue;
        }
        grid[mid][i].isWall = true;
      } 
    }

    verticalStep(mid,y1,y2) {
      const { grid } = this;
      let first  = false;
      let second = false;
      let max = y2 - 1;
      let min = y1 + 1;
      let rand = this.randomNumber(min, max);

      if (!grid[y2][mid].isWall){
        rand = max;
        first = true;
      }
      if (!grid[y1][mid].isWall){
        rand = min;
        second = true;
      }
      for (let i = y1 + 1; i < y2; i++){
        if (first && second){
          if (i == max || i == min){
            continue;
          }
        }
        else if (i == rand){
          continue;
        }
        grid[i][mid].isWall  = true;
      }
    }

    
}
export default RecMaze;

