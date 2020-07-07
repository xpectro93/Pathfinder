import { drawNoPath } from '../helper.js';
import AStar from '../Pathfinders/AStar.js';
//start and end location vertex 
export  function useAStar (start, target, grid,ctx, speed = 5) {
    let newSearch = new AStar(start, target,grid);
        let search = setInterval(() => {
            let stepValue = newSearch.step();
            if(!newSearch.openSet.length) {
                clearInterval(search);
                drawNoPath(ctx, newSearch.start.size * newSearch.grid.length);
            }
            if(stepValue === 1) {
                finalPathAStar(ctx, newSearch)
                clearInterval(search);

            }
            //draw openset
            newSearch.openSet.forEach(vertex => vertex.draw(ctx,"rgb(253,42,135)"))
            //draw closedset
            newSearch.closedSet.forEach(vertex => vertex.draw(ctx,`rgba(9,74,103,0.1)`))
            let currentPath = newSearch.constructPath();
            //draw current shortest path
            currentPath.forEach(vertex => vertex.draw(ctx,"rgb(209,248,234)"))

        },speed)
}

function finalPathAStar (ctx,newSearch) {
    let path = newSearch.constructPath();
    let i = 0;
    let shortestPath = setInterval(() => {
        if(i === path.length - 1) {
            
            clearInterval(shortestPath)
        }
        
        path[i].draw(ctx,"rgb(0, 253, 190)");
        i++
        
    }, 5);
}