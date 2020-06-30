import Node from '/Node.js';
import AStar from './AStar.js';
import { isValidLocation , drawInstructions } from './helper.js'

//Grab Canvas from DOM;
let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

//Grab form elements from body;
let gridSize = document.getElementById('gridRange');
let position = document.getElementById('position');
let form = document.getElementById('gridForm');


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


drawInstructions(ctx,WIDTH,HEIGHT)

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
   drawingGrid = [];

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
canvas.addEventListener('touchstart', e => isDrawing = true);
canvas.addEventListener('touchmove', changeToWallMobile);
canvas.addEventListener('touchend', e => isDrawing = false);

// TODO: Add event listener for mobile'



function changeToWall(e) {
    let tx = Math.floor(e.offsetX / h);
    let ty = Math.floor(e.offsetY / h);
    if(isDrawing && isValidLocation(drawingGrid,ty,tx)) {
        //TODO: Add boundary check
        drawingGrid[ty][tx].isWall = true;
        drawingGrid[ty][tx].draw(ctx)

    }
}

function changeToWallMobile (e) {

    let rect = e.target.getBoundingClientRect();
    let x = Math.floor((e.targetTouches[0].pageX - rect.left)/10);
    let y = Math.floor((e.targetTouches[0].pageY - rect.top)/10);

    if(isDrawing && isValidLocation(drawingGrid,y,x)) {
        
        drawingGrid[y][x].isWall = true;      
        drawingGrid[y][x].draw(ctx)
    } else return 

}

function findOurWayHome (e) {
    //TODO: Add check here
    let newSearch = new AStar(start, end,drawingGrid);


    newSearch.timedFindPath(ctx);

}

