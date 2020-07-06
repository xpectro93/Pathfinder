

class Canvas {

    constructor(canvas, algo, speed) {
        this.ctx = canvas;
        this.algo = algo;
        this.speed = speed;
    }

    createGrid(start,tar) {
        if(this.algo === "A*");

    }
    AStar() {



        let search = setInterval(() => {

          let stepResult =  this.algo.purePathFinder();
          
          if(!stepResult) clearInterval(search);
        },this.speed);
    }




    
}
export default Canvas;