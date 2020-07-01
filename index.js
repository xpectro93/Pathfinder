import Node from '/Node.js';
import AStar from './AStar.js';
import { isValidLocation , drawInstructions, changePixelType } from './helper.js'

//Grab Canvas from DOM;
let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

//Grab form elements from body;
let gridSize = document.getElementById('gridRange');
let type = document.getElementById('type');
let form = document.getElementById('gridForm');


let WIDTH = canvas.width = window.innerWidth;
let HEIGHT = canvas.height = window.innerHeight;


let SCALE;
let w;
let h;


drawInstructions(ctx,WIDTH,HEIGHT)

//Position
let position = {};

let drawingGrid = [];
gridSize.addEventListener('change', e => {

    //clear node grid;
    //TODO: Add rest of the clearing values
    //Could be a function;
   type.value = "wall";
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
            ctx.strokeStyle = "black"
            ctx.strokeRect(x * w, y * h, w, h);
            let node = new Node(x,y,false,w,h);

            drawingRow.push(node);

        }
        drawingGrid.push(drawingRow);
    }

})

let isDrawing = false;
canvas.addEventListener('mousemove', change);
canvas.addEventListener('mousedown', _ => isDrawing = true);
canvas.addEventListener('mouseup', _ => isDrawing = false);
// canvas.addEventListener('click', testClick)

form.addEventListener('submit', e=> {
    e.preventDefault();
    findOurWayHome()
})
//MOBILE EXPERIENCE
canvas.addEventListener('touchstart', e => isDrawing = true);
canvas.addEventListener('touchmove', changeMobile);
canvas.addEventListener('touchend', e => isDrawing = false);

function change(e) {
    
    let tx = Math.floor(e.offsetX / h);
    let ty = Math.floor(e.offsetY / h);
    console.log(e.offsetX,e.offsetY)
    if(isDrawing && isValidLocation(drawingGrid,ty,tx)) {
        let pixel  = drawingGrid[ty][tx];
    
        position[type.value]  = changePixelType(ctx,type.value,pixel);
    }
}

function changeMobile (e) {

    let rect = e.target.getBoundingClientRect();
    let x = Math.floor((e.targetTouches[0].pageX - rect.left)/10);
    let y = Math.floor((e.targetTouches[0].pageY - rect.top)/10);

    if(isDrawing && isValidLocation(drawingGrid,y,x)) {
        let pixel  = drawingGrid[y][x];
    
        position[type.value]  = changePixelType(ctx,type.value,pixel);
    }

}

function findOurWayHome (e) {
    
    let newSearch = new AStar(position.start, position.end,drawingGrid);


    newSearch.timedFindPath(ctx);

}


function testClick (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    drawingGrid.forEach(row => {
        row.forEach(node=> {
            if(node.isClicked(x,y)) {
                
                node.isWall = true;
                node.draw(ctx,'yellow');
                // debugger;
            }
        })
    })


}
