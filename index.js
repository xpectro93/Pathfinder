import Node from '/Node.js';
import AStar from './AStar.js';
import { isValidLocation } from './helper.js'

//Grab Canvas from DOM;
let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

//Grab form elements from body;
let gridSize = document.getElementById('gridRange');
let position = document.getElementById('position');
let submitBtn = document.getElementById('submit');
let form = document.getElementById('gridForm');
console.log(position)
position.addEventListener('change', e =>{
    if(e.currentTarget.value === "start") {
        isStart = true;
        isEnd = false;
    }else if (e.currentTarget.value === "end") {
        isStart = false;
        isEnd = true;
    } else {
        isStart = isEnd = false;
    }
})

let WIDTH = canvas.width = window.innerWidth;
let HEIGHT = canvas.height = window.innerHeight;

let SCALE;
let w;
let h;

//Position
let isStart = false;
let isEnd = false;
let start;
let end;

let drawingGrid = [];
gridSize.addEventListener('change', e => {

    //clear node grid;
    //TODO: Add rest of the clearing values
    //Could be a function;
   drawingGrid = []

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    //convert range input to number
    SCALE = Number(e.target.value);
    w = (WIDTH / SCALE);
    h = (HEIGHT / SCALE);

    for (let y = 0; y < SCALE; y++) {
        let drawingRow = [];
        for (let x = 0; x < SCALE; x++) {
            //x,y,w,h
            ctx.strokeRect(x * w, y * h, w, h);
            let node = new Node(x,y,false,w,h);

            drawingRow.push(node);

        }
        drawingGrid.push(drawingRow);
    }

})








let isDrawing = false;
canvas.addEventListener('mousemove', changeToWall);
canvas.addEventListener('mousedown', _ => isDrawing = true);
canvas.addEventListener('mouseup', _ => isDrawing = false);

canvas.addEventListener('click', e => {
    let tx = Math.floor(e.offsetX / h);
    let ty = Math.floor(e.offsetY / h);
    if(isStart && isValidLocation(drawingGrid,ty,tx)) {
       
            start = drawingGrid[ty][tx]
            drawingGrid[ty][tx].drawPath(ctx,"violet");
        
     } else if(isEnd && isValidLocation(drawingGrid,ty,tx)) {
            end = drawingGrid[ty][tx]
            drawingGrid[ty][tx].drawPath(ctx,"green");
  
     } else return
})
// canvas.addEventListener('dblclick', e => findOurWayHome)
form.addEventListener('submit', e=> {
    e.preventDefault();
    findOurWayHome()
})
//MOBILE EXPERIENCE
// canvas.addEventListener('touchmove', changeToWallMobile);
// canvas.addEventListener('touchstart', e => isDrawing = true);
// canvas.addEventListener('touchend', e => isDrawing = false);

// TODO: Add event listener for mobile'
// canvas.addEventListener('')


function changeToWall(e) {
    if(isDrawing) {

        //TODO: turn this part into function;
        let tx = Math.floor(e.offsetX / h);
        let ty = Math.floor(e.offsetY / h);

        //TODO: Add boundary check
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

function findOurWayHome (e) {
    //TODO: Add check here
    let newSearch = new AStar(start, end,drawingGrid);
    //  newSearch.findPath();
    // let path = newSearch.constructPath();


    // //paths already explored
    // newSearch.closedSet.forEach(row =>{
    //     row.drawPath(ctx,`cyan`);

    // });
    // //paths to be explored
    // newSearch.openSet.forEach(node => node.drawPath(ctx, 'pink'));

    // //Solution
    // path.forEach(node => {
    //     node.draw(ctx)
    // })

    newSearch.timedFindPath(ctx);
    


}