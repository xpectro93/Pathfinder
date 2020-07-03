class Prim {
    constructor(randomVertex,grid) {
        this.reached = new Set();
        this.reached.add(randomVertex)
        this.unreached = []
    }

    getDistance (a,b) {
        return Math.hypot(b.x - a.x, b.y - a.y);
    }

    doTheThing(ctx) {
        //goal is to get all unreached nodes to reached;
        while(this.unreached.length) {
            let xx;
            let yy;
            let uNode;
            let currentShortest =  Infinity;
            this.reached.forEach( a => {
                this.unreached.forEach((row,y) =>{
                    row.forEach((vertex,x) => {
                    let distance = this.getDistance(a,vertex);
                    if(distance < currentShortest) {
                        currentShortest = distance;
                        uNode = vertex;
                        xx = x;
                        yy = y;
                    }
                    })
                })
            })
            uNode.draw(ctx,"pink")
            this.reached.add(uNode);
            this.unreached[yy].splice(xx,1)
            debugger
            //color?  
            
        }
        console.log('it broke')
    }
}


export default Prim;
//pick random vertex;
//check least distance;
