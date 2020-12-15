import { usePathfinder} from './Helpers/pathHelper.js'
import { drawInstructions, changePixelType , createBoard } from './helper.js'
import Dijkstra from './Pathfinders/Dijkstra.js';
import AStar from './Pathfinders/AStar.js';
import DFS from './Pathfinders/DFS.js';

//Grab Canvas from DOM;
let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

//Grab form elements from body;
let form = document.getElementById('gridForm');
let gridSlider = document.getElementById('gridRange');
let type = document.getElementById('type');
let mazeType = document.getElementById("mazeType");
let resetBtn = document.getElementById("reset");
let algoType = document.getElementById("algoType");

//Materialize 
let modal =  document.querySelectorAll('.modal');
M.Modal.init(modal);
let selects = document.querySelectorAll('select');
M.FormSelect.init(selects);

//minimum dimension; 
let minDim = Math.min(window.innerHeight, window.innerWidth)

canvas.width = minDim;
canvas.height = minDim;

let SCALE = Number(gridSlider.value)
let SIZE = minDim / Number(gridSlider.value)
drawInstructions(ctx,minDim)

const algoObj = {
    aStar:AStar,
    dijkstra:Dijkstra,
    DFS

}
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

    drawingGrid = createBoard(ctx, SIZE, SCALE,mazeType.value,algoType.value) ;  
});

mazeType.addEventListener('change', _ => {
    reset();
    ctx.clearRect(0, 0, minDim, minDim);
    drawingGrid = createBoard(ctx, SIZE, SCALE,mazeType.value,algoType.value)
})
algoType.addEventListener('change', _ => {

    // reset();
    ctx.clearRect(0, 0, minDim, minDim);
    drawingGrid.forEach(row => {
        row.forEach(v => {
            if(!v.isWall) v.drawLine(ctx,'rbg(24,24,24')
            else v.draw(ctx,'rgb(24,24,24)')
        })
    })
    if(position.start && position.end) {
        position.start.draw(ctx,"blue")
        position.end.draw(ctx,"red");
    }
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

    //We can just add a check here to execute different searches
    if(position.start && position.end) {

        let type = algoObj[algoType.value];

        usePathfinder(type,position.start, position.end,drawingGrid,ctx);
    }
})
//MOBILE EXPERIENCE
canvas.addEventListener('touchstart', e => isDrawing = true);
canvas.addEventListener('touchmove', e=> change(e,true));
canvas.addEventListener('touchend', e => isDrawing = false);

function change (e, isMobile = false) {
    let mouseX;
    let mouseY;
    //if this is on mobile, use these x and y mouse coords
    if(isMobile) {
        let rect = e.target.getBoundingClientRect();
        mouseX = e.targetTouches[0].pageX - rect.left;
        mouseY = e.targetTouches[0].pageY - rect.top;
    }else {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }

    drawingGrid.forEach(row => {
        row.forEach(vertex => {

            if(isDrawing && vertex.isClicked(mouseX, mouseY) && type.value === "wall") {
              vertex.isWall = true;
              vertex.draw(ctx,"black")
            }
        })

    })

};


function clicked (e) {

    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if(type.value !== "wall"){
        drawingGrid.forEach(row => {
        row.forEach(vertex => {
            if(vertex.isClicked(mouseX,mouseY)) {
                if(position[type.value]) {
                    let oldPosition = position[type.value];
                    ctx.strokeStyle = "black"
                    ctx.strokeRect
                    (oldPosition.x * oldPosition.size,
                     oldPosition.y * oldPosition.size,
                     oldPosition.size,oldPosition.size);

                    oldPosition.draw(ctx,"white");
                        
                }
                vertex.isWall = false;
                position[type.value] = vertex;
                changePixelType(ctx,type.value,vertex)
            }     
        }) })

    }
    
}

function reset() {
    //to cancel all setIntervals from previous drawing
    let id = window.setInterval(()=>{}, 0);
    while (id--) window.clearInterval(id);
    type.value = "start";
    drawingGrid = []
    position = {};
    ctx.clearRect(0, 0, minDim, minDim);
    drawInstructions(ctx, minDim) 
}


