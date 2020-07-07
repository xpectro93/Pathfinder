
import AStar from './Pathfinders/AStar.js';

import { drawInstructions, drawNoPath, changePixelType , createBoard } from './helper.js'

//Grab Canvas from DOM;
let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

//Grab form elements from body;
let form = document.getElementById('gridForm');
let gridSlider = document.getElementById('gridRange');
let type = document.getElementById('type');
let mazeType = document.getElementById("mazeType");
let resetBtn = document.getElementById("reset");
//minimum dimension; 
let minDim = Math.min(window.innerHeight, window.innerWidth)

canvas.width = minDim;
canvas.height = minDim;

let SCALE = Number(gridSlider.value)
let SIZE;
drawInstructions(ctx,minDim,minDim)

//start and endposition
let position = {};

let drawingGrid = [];
gridSlider.addEventListener('change', e => {
 
    //reset form and canvas if there is a change
    reset();
    ctx.clearRect(0, 0, minDim, minDim);
    //convert range input to number
    SCALE = Number(e.target.value);
    SIZE = minDim / SCALE

    drawingGrid = createBoard(ctx, SIZE, SCALE,mazeType.value) ;  
});

mazeType.addEventListener('change', e => {
    reset();
    drawingGrid = createBoard(ctx, SIZE, SCALE,mazeType.value)
})




let isDrawing = false;
canvas.addEventListener('mousemove', change);
canvas.addEventListener('mousedown', _ => isDrawing = true);
canvas.addEventListener('mouseup', _ => isDrawing = false);
canvas.addEventListener('click', clicked);

window.addEventListener('resize',() => {
    minDim =  Math.min(window.innerHeight, window.innerWidth)
    canvas.width = minDim
    canvas.height = minDim;
    reset();
    drawInstructions(ctx,minDim);
});

resetBtn.addEventListener("click",reset)
form.addEventListener('submit', e=> {
    e.preventDefault();

    if(position.start && position.end) {
        useAStar();
    }
})
//MOBILE EXPERIENCE
canvas.addEventListener('touchstart', e => isDrawing = true);
canvas.addEventListener('touchmove', changeMobile);
canvas.addEventListener('touchend', e => isDrawing = false);

function change (e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    drawingGrid.forEach(row => {
        row.forEach(vertex => {

            if(isDrawing && vertex.isClicked(mouseX, mouseY) && type.value === "wall") {
              vertex.isWall = true;
              vertex.draw(ctx,"black")
            }
        })

    })

};


function changeMobile (e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.targetTouches[0].pageX - rect.left;
    let y = e.targetTouches[0].pageY - rect.top;

    drawingGrid.forEach(row => {
        row.forEach(vertex => {

            if(isDrawing && vertex.isClicked(x, y)) {
               position[type.value] = changePixelType(ctx,type.value, vertex)
            }
        })

    })

}

function useAStar (speed = 5) {
    
        let newSearch = new AStar(position.start, position.end,drawingGrid);

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
                vertex.draw(ctx,"blue");
            })

            newSearch.closedSet.forEach(vertex => {
                vertex.draw(ctx,"rgba(204, 255, 255,0.1)");
            })
            let currentPath = newSearch.constructPath();
            currentPath.forEach(vertex => vertex.draw(ctx,"purple"))
        },speed)
    

}


function clicked (e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if(type.value !== "wall"){
        drawingGrid.forEach(row => {
        row.forEach(vertex => {
            if(vertex.isClicked(mouseX,mouseY)) {
                if(position[type.value]) {
                    let oldPosition = position[type.value]
                    ctx.strokeStyle = "black"
                    ctx.strokeRect
                    (oldPosition.x * oldPosition.size,
                     oldPosition.y * oldPosition.size,
                     oldPosition.size,oldPosition.size);

                    oldPosition.draw(ctx,"white");
                        
                }
                position[type.value] = vertex;
                changePixelType(ctx,type.value,vertex)
            }     
        }) })

    }
    
}

function reset() {
    //to cancel all setIntervals from previous 
    let id = window.setInterval(()=>{}, 0);
    while (id--) window.clearInterval(id);
    type.value = "wall";
    drawingGrid = [];
    position = {};
    ctx.clearRect(0, 0, minDim, minDim);
    drawInstructions(ctx,minDim)
}