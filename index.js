import Node from '/Node.js';
import AStar from './AStar.js';

//Grab Canvas from DOM;
let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

//Grab form elements from body;
let gridSize = document.getElementById('gridRange');

let WIDTH = canvas.width = window.innerWidth;
let HEIGHT = canvas.height = window.innerHeight;

let SCALE;
let w;
let h;

let drawingGrid = [];
gridSize.addEventListener('change', e => {
    //clear drawing grid
   drawingGrid = []
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    SCALE = Number(e.target.value);
    w = (WIDTH / SCALE);
    h = (HEIGHT / SCALE);

    for (let y = 0; y < SCALE; y++) {
        let drawingRow = [];
        for (let x = 0; x < SCALE; x++) {
            // ctx.strokeStyle = 'black';
            //x,y,w,h
            
            console.log(w,h)
            ctx.strokeRect(x * w, y * h, w, h);
            let node = new Node(x,y,false,w,h);
            // let node = new Color(x,y,false,w,h);

            drawingRow.push(node);

        }
        drawingGrid.push(drawingRow);
    }

    // console.log(drawingGrid[0][0].width, drawingGrid[0][0].height,SCALE,w,h)
})








let isDrawing = false;
canvas.addEventListener('mousemove', changeToWall);
canvas.addEventListener('mousedown', e => isDrawing = true);
canvas.addEventListener('mouseup', e => isDrawing = false);
canvas.addEventListener('dblclick', e => findOurWayHome)

//MOBILE EXPERIENCE
// canvas.addEventListener('touchmove', changeToWallMobile);
// canvas.addEventListener('touchstart', e => isDrawing = true);
// canvas.addEventListener('touchend', e => isDrawing = false);
// TODO: Add event listener for mobile'
// canvas.addEventListener('')


function changeToWall(e) {
    if(isDrawing) {
        let tx = Math.floor(e.offsetX / h);
        let ty = Math.floor(e.offsetY / h);

        
        drawingGrid[ty][tx].isWall = true;
        
        drawingGrid[ty][tx].draw(ctx)

    }
}

// function changeToWallMobile (e) {

//     if(isDrawing) {
//         let rect = e.target.getBoundingClientRect();
//         let x = Math.floor((e.targetTouches[0].pageX - rect.left)/10);
//         let y = Math.floor((e.targetTouches[0].pageY - rect.top)/10);
//         console.log(x/10,y/10)
//         drawingGrid[y][x].isWall = true;      
//         drawingGrid[y][x].draw(ctx)
//     }

// }

function findOurWayHome () {
    e.preventDefault();
    let start = drawingGrid[1][1];
    let end = drawingGrid[75][75];
    let newSearch = new AStar(start, end,drawingGrid);
     newSearch.findPath();
    let path = newSearch.constructPath();


    //paths already explored
    newSearch.closedSet.forEach(row =>{
        row.drawPath(ctx,`cyan`);

    });
    //paths to be explored
    newSearch.openSet.forEach(node => node.drawPath(ctx, 'pink'))
    path.forEach(node => {
        node.draw(ctx)
    })
}