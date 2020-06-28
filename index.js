import Node from '/Node.js';
import AStar from './AStar.js';

let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

let WIDTH = canvas.width = window.innerWidth;
let HEIGHT = canvas.height = window.innerHeight;

let SCALE = 10

let w = (WIDTH / SCALE);
let h = (HEIGHT / SCALE);

let drawingGrid = [];

for (let y = 0; y < SCALE; y++) {
    let drawingRow = [];
    for (let x = 0; x < SCALE; x++) {
        ctx.strokeStyle = 'black';
        //x,y,w,h
        ctx.strokeRect(x * w, y * h, w, h);
        let node = new Node(x,y,false,w,h);
        // let node = new Color(x,y,false,w,h);

        drawingRow.push(node);

    }
    drawingGrid.push(drawingRow);
}







let isDrawing = false;
canvas.addEventListener('mousemove', changeToWall);
canvas.addEventListener('mousedown', e => isDrawing = true);
canvas.addEventListener('mouseup', e => {
    isDrawing = false
});
canvas.addEventListener('dblclick', e => {
    e.preventDefault();
    let start = drawingGrid[1][1];
    let end = drawingGrid[7][7];
    let newSearch = new AStar(start, end,drawingGrid);
     newSearch.findPath();
    let path = newSearch.constructPath();


    //paths already explored
    newSearch.closedSet.forEach(row =>{
        row.drawPath(ctx,`green`);

    });
    //paths to be explored
    newSearch.openSet.forEach(node => node.drawPath(ctx, 'pink'))
    path.forEach(node => {
        node.draw(ctx)
    })
})

function changeToWall(e) {
    if(isDrawing) {
        let tx = Math.floor(e.offsetX / h);
        let ty = Math.floor(e.offsetY / h);
 
        drawingGrid[ty][tx].isWall = true;
        
        drawingGrid[ty][tx].draw(ctx)

    }
}

