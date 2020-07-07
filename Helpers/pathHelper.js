import { drawNoPath } from '../helper.js';
import AStar from '../Pathfinders/AStar.js';
//start and end location vertex 
export  function useAStar (start, target, grid, speed = 5,ctx) {
    let newSearch = new AStar(start, target,grid);

        let search = setInterval(() => {
            let stepValue = newSearch.step();
            if(!newSearch.openSet.length) {
                drawNoPath(ctx, minDim);
                clearInterval(search);
            }
            if(stepValue === 1) {
                newSearch.showPath(ctx)
                clearInterval(search);

            }
            newSearch.openSet.forEach(vertex => {
                vertex.draw(ctx,"rgb(253,42,135)");
            })

            newSearch.closedSet.forEach(vertex => {
                vertex.draw(ctx,"rgba(9,74,103,0.1)");
            })
            let currentPath = newSearch.constructPath();
            currentPath.forEach(vertex => vertex.draw(ctx,"rgb(209,248,234)"))
        },speed)
}