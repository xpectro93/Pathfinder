import { drawNoPath } from '../helper.js';
import DFS from "../Pathfinders/DFS.js";

function finalPath (ctx,newSearch) {
    let path = newSearch.constructPath();
    let i = 0;
    let shortestPath = setInterval(() => {
        if(i === path.length - 1) { 
            clearInterval(shortestPath)
        }
            
        
        path[i].draw(ctx,"rgb(0, 253, 190)");
        newSearch.start.draw(ctx,"blue");
        newSearch.target.draw(ctx,"red");
        i++
        
    }, 5);
}

/* DIJKSTRA */
export  function usePathfinder (Callback,start, target, grid,ctx, speed = 5) {
    let newSearch = new Callback(start, target,grid);
        let search = setInterval(() => {
            let stepValue = newSearch.step();
 
            if(!newSearch.openSet.length) {
                drawNoPath(ctx, newSearch.start.size * newSearch.grid.length);
                clearInterval(search);
            }
            if(stepValue === 1) {
                finalPath(ctx, newSearch)
                clearInterval(search);

            }
            // draw openset
            newSearch.openSet.forEach(vertex => vertex.draw(ctx,"rgb(253,42,135)"))
            //draw closedset
            newSearch.closedSet.forEach(vertex => vertex.draw(ctx,`rgba(9,74,103,0.1)`))
            let currentPath = newSearch.constructPath();
            //draw current shortest path
            currentPath.forEach(vertex => vertex.draw(ctx,"rgb(209,248,234)"))

        },speed)
}
export function useDFS (start, end, drawingGrid,ctx) {
    let newSearch = new DFS(start,end,drawingGrid,ctx);

    let search = setInterval(() => {
        let stepValue = newSearch.step();

        if(!newSearch.openSet.length) {
            console.log('we failed yo')
            drawNoPath(ctx, newSearch.start.size * newSearch.grid.length);
            clearInterval(search);
        }
        if(stepValue === 1) {
            finalPath(ctx, newSearch)
            clearInterval(search);

        }
        // draw openset
        newSearch.openSet.forEach(vertex => vertex.draw(ctx,"rgb(253,42,135)"))
        //draw closedset
        newSearch.closedSet.forEach(vertex => vertex.draw(ctx,`rgba(9,74,103,0.1)`))
        let currentPath = newSearch.constructPath();
        //draw current shortest path
        currentPath.forEach(vertex => vertex.draw(ctx,"rgb(209,248,234)"))

    },5)
}