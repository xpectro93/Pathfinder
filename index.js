
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
//minimum dimension; 
let minDim = Math.min(window.innerHeight, window.innerWidth)

canvas.width = minDim;
canvas.height = minDim;

let SCALE;
let SIZE;
drawInstructions(ctx,minDim,minDim)

//start and endposition
let position = {};

let drawingGrid = [];
gridSlider.addEventListener('change', e => {
 
    //reset form and canvas if there is a change
    reset();

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

form.addEventListener('submit', e=> {
    e.preventDefault();
    useAStar()
})
//MOBILE EXPERIENCE
canvas.addEventListener('touchstart', e => isDrawing = true);
canvas.addEventListener('touchmove', changeMobile);
canvas.addEventListener('touchend', e => isDrawing = false);

function change (e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    drawingGrid.forEach(row => {
        row.forEach(node => {

            if(isDrawing && node.isClicked(mouseX, mouseY) && type.value === "wall") {
              node.isWall = true;
              node.draw(ctx,"black")
            }
        })

    })

};


function changeMobile (e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.targetTouches[0].pageX - rect.left;
    let y = e.targetTouches[0].pageY - rect.top;

    drawingGrid.forEach(row => {
        row.forEach(node => {

            if(isDrawing && node.isClicked(x, y)) {
               position[type.value] = changePixelType(ctx,type.value, node)
            }
        })

    })

}

function useAStar () {
    if(position.start && position.end) {
        let newSearch = new AStar(position.start, position.end,drawingGrid);

        let search = setInterval(() => {
            let stepValue = newSearch.step();
            if(!newSearch.openSet.length) {
                drawNoPath(ctx, minDim);
                clearInterval(search);
            }
            if(stepValue === 1) {
                console.log('win');
                newSearch.showPath(ctx)
                clearInterval(search);

            }
            newSearch.openSet.forEach(vertex => {
                vertex.draw(ctx,"blue");
            })

            newSearch.closedSet.forEach(vertex => {
                vertex.draw(ctx,"grey");
            })
            let currentPath = newSearch.constructPath();
            currentPath.forEach(vertex => vertex.draw(ctx,"purple"))

            


        },5)
    }
    

}


function clicked (e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if(type.value !== "wall"){
        drawingGrid.forEach(row => {
        row.forEach(node => {
            if(node.isClicked(mouseX,mouseY)) {
                if(position[type.value]) {
                    let p = position[type.value]
                    ctx.strokeStyle = "black"
                    ctx.strokeRect(p.x * p.size, p.y * p.size,p.size,p.size);
                    position[type.value].draw(ctx,"white");
                        
                }
                position[type.value] = node;
                changePixelType(ctx,type.value,node)
            }     
        }) })

    }
    
}

function reset() {
    type.value = "wall";
    drawingGrid = [];
    position = {};
    ctx.clearRect(0, 0, minDim, minDim);
}