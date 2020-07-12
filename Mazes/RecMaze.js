class RecMaze {
    constructor(grid) {
				this.grid = grid;
				this.step = this.step.bind(this);
    }
    avg(min,max) {
      return Math.floor((min + max) / 2);
    }
    randomNumber(min,max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    step(minX,maxX,minY,maxY) {
			console.log('loop')
			const { grid, step } = this;

			let lengthX =  maxX - minX;
			let lengthY = maxY - minY;
			
			if(lengthX < 4 || lengthY < 4) return;

			let midX = this.avg(minX, maxX);
			let midY = this.avg(minY, maxY);

			
			for(let y = minY; y < maxY; y++) {
				for(let x = minX; x < maxX; x++) {
					if(midX === x) grid[y][x].isWall = true;
					else if(midY === y) grid[y][x].isWall = true;
				}
			}

			let randX = this.randomNumber(minX,minY);
			let randY = this.randomNumber(minY,maxY);
			grid[randY][midX].isWall = false;
			grid[midY][randX].isWall = false;

			step(minX,midX,minY,midY);
			step(midX,maxX,minY,midY);
			step(minX, midX, midY,maxY);
			step(midX,maxX, midY,maxY);
			

    }
}
export default RecMaze;