import Node from '/Node.js';
import AStar from './AStar.js';

let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

let WIDTH = canvas.width = window.innerWidth;
let HEIGHT = canvas.height = window.innerHeight;

const dungeon = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,4,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,4,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,0,0,0,'b',0,0,0,0,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,0,'i','p','c',0,0,1,0,1,1,2,1,1,1,1,1,1],
    [6,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,6],
    [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,4,2,2,1,1,2,2,2,2,2,2,2,0,5,2,2,2,2,2,2,2,1,1,2,2,4,1],
    [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
    [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
    [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

let w = (WIDTH / 50);
let h = (HEIGHT / 50);

let drawingGrid = [];

for (let y = 0; y < 50; y++) {
    let drawingRow = [];
    for (let x = 0; x < 50; x++) {
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
    let end = drawingGrid[45][45];
    let newSearch = new AStar(start, end,drawingGrid);
     newSearch.findPath();
    let path = newSearch.constructPath();

    console.log(path)

    path.forEach(node => {
        node.draw(ctx)
    })
})

function collision (mouse, box) {
    debugger
    let LRCheck = (mouse.x > box.x && mouse.x < (box.x + box.width));
    // let UDCheck = (mouse.y > box.y && mouse.y < (box.y + box.height));
    //&& UDCheck
    return LRCheck ;
}

function changeToWall(e) {

    if(isDrawing) {
        let tx = Math.floor(e.offsetX / h);
        let ty = Math.floor(e.offsetY / h);
        let mouse = { x: e.offsetX, y:e.offsetY};

        // for(let y = 0; y < drawingGrid.length; y++) {
        //     for(let x = 0; x < drawingGrid[0].length; x++) {
        //         let box = drawingGrid[y][x]

        //         if(collision(mouse,box)) {
        //             drawingGrid[y][x].isWall = true;
        //             drawingGrid[y][x].draw(ctx)
        //         }
        //     }
        // }
        console.log(drawingGrid[ty][tx],tx,ty)
        drawingGrid[ty][tx].isWall = true;
        
        drawingGrid[ty][tx].draw(ctx)

    }
}

