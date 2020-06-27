import Node from '/Node.js';
import AStar from './AStar.js';

let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

let WIDTH = canvas.width = window.innerWidth;
let HEIGHT = canvas.height = WIDTH;

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

// let objGrid = []
// dungeon.forEach((row, y) => {
//     let objRow = []
//     row.forEach((box, x) => {
    
//         if(box === 1) {
//             objRow.push(new Node(x,y,true,WIDTH,HEIGHT));

//         }else {
//             objRow.push(new Node(x,y,false,WIDTH,HEIGHT));
//         }


//     });
//     objGrid.push(objRow);
// });


// let pacX = 15
// let pacY = 17
// let start = objGrid[1][1];
// let end = objGrid[pacY][pacX];


// let kappa = new AStar(start, end,objGrid);
// kappa.findPath();

// const draw = () => {

//       // console.log('this is happening');
//     objGrid.forEach(row => {
//         row.forEach(box => {
//             // debugger
//             box.draw(ctx)
//         })
//     })
    

  




// }

// debugger
// let path = kappa.constructPath();
// // draw(path)
// ctx.fillStyle = 'red';
// ctx.fillRect(1 * 32.28,18.93,32.28, 18.93)

// ctx.fillStyle = 'yellow';
// ctx.fillRect(pacX * 32.28, pacY*18.93,32.28, 18.93) 

// let i = 0;
// let stopTime = setInterval(() => {
//     let node = path[i];
//     let x = node.x;
//     let y = node.y;
//     objGrid[y][x].draw(ctx,"red")
//     i++;
//     if(i === path.length) clearInterval(stopTime)
// },50)

// console.log(path);
class Color {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(ctx) {
        // debugger
        ctx.fillStyle = "black";
        ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
}

ctx.strokeStyle = 'green';

let w = WIDTH / 50;
let h = HEIGHT / 50;

let drawingGrid = [];

for (let y = 0; y < 50; y++) {
    let drawingRow = [];
    for (let x = 0; x < 50; x++) {
        ctx.strokeStyle = 'black';
        //x,y,w,h
        ctx.strokeRect(x * w, y * h, w, h);
        let node = new Color(x,y,w,h);

        drawingRow.push(node);

    }
    drawingGrid.push(drawingRow);
}
let isDrawing = false;
canvas.addEventListener('mousemove', changeToWall);
canvas.addEventListener('mousedown', e => isDrawing = true);
canvas.addEventListener('mouseup', e => isDrawing = false);

function changeToWall(e) {
    if(isDrawing) {
        let tx = Math.floor(e.offsetX / w);
        let ty = Math.floor(e.offsetY / h);
        drawingGrid[ty][tx].draw(ctx)

    }
}
