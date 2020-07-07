import { drawNoPath } from '../helper.js';
import AStar from '../Pathfinders/AStar.js';
//start and end location vertex 
export  function useAStar (start, target, grid,ctx, speed = 5) {
    let newSearch = new AStar(start, target,grid);
    let test = 0.1;
        let search = setInterval(() => {
            let stepValue = newSearch.step();
            if(!newSearch.openSet.length) {
                drawNoPath(ctx, newSearch.start.size * newSearch.grid.length);
                clearInterval(search);
            }
            if(stepValue === 1) {
                newSearch.showPath(ctx)
                clearInterval(search);

            }
            //draw openset
            newSearch.openSet.forEach(vertex => vertex.draw(ctx,"rgb(253,42,135)"))
            //draw closedset
            newSearch.closedSet.forEach(vertex => vertex.draw(ctx,`rgba(9,74,103,${test})`))
            test + 0.1 > 1 ? test= 0.1 : test+=0.1;
            let currentPath = newSearch.constructPath();
            //draw current shortest path
            currentPath.forEach(vertex => vertex.draw(ctx,"rgb(209,248,234)"))
            console.log('this keeps happening')
        },speed)
}