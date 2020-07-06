import Node from '/Node.js';
import AStar from './AStar.js';
import Prim  from './Prim.js';

import { drawInstructions, drawNoPath, changePixelType} from './helper.js'

//Grab Canvas from DOM;
let canvas = document.getElementById('root');
let ctx = canvas.getContext('2d');

//Grab form elements from body;
let form = document.getElementById('gridForm');
let gridSlider = document.getElementById('gridRange');
let type = document.getElementById('type');

//minimum dimension; 
let minDim = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

let WIDTH = canvas.width = minDim
let HEIGHT = canvas.height = minDim;

let SCALE;
let w;
let h;
window.addEventListener('resize',() => {
    minDim = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    WIDTH = canvas.width = minDim
    HEIGHT = canvas.height = minDim;
    reset();
    drawInstructions(ctx,WIDTH,HEIGHT);
});

drawInstructions(ctx,WIDTH,HEIGHT)

//start and endposition
let position = {};

let drawingGrid = [];
gridSlider.addEventListener('change', e => {
 
    //reset form and canvas if there is a change
    reset();

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
            let node = new Node(x,y,w,true);
            node.draw(ctx,"black")
            drawingRow.push(node);

        }
        drawingGrid.push(drawingRow);
    }

    let randomNodeX = Math.floor(Math.random() * drawingGrid.length);
    let randomNodeY = Math.floor(Math.random() * drawingGrid.length);
    let randomNode = drawingGrid[randomNodeX][randomNodeY];
    
    let newPrim = new Prim(randomNode, drawingGrid);
    newPrim.step(ctx);

})




let isDrawing = false;
canvas.addEventListener('mousemove', change);
canvas.addEventListener('mousedown', _ => isDrawing = true);
canvas.addEventListener('mouseup', _ => isDrawing = false);
canvas.addEventListener('click', clicked)

form.addEventListener('submit', e=> {
    e.preventDefault();
    findOurWayHome()
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

function findOurWayHome (e) {
    if(position.start && position.end) {
        let newSearch = new AStar(position.start, position.end,drawingGrid);

        let search = setInterval(() => {
            let stepValue = newSearch.purePathFinder();
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
                vertex.draw(ctx,"pink");
            })
            newSearch.closedSet.forEach(vertex => {
                vertex.draw(ctx,"grey");
            })
            


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
                        ctx.strokeRect(p.x * p.dimension, p.y * p.dimension,p.dimension,p.dimension);
                        position[type.value].draw(ctx,"white");
                        position[type.value] = node;
                        changePixelType(ctx,type.value,node)
                       
                    }
                    else {
                        position[type.value] = node;
                        changePixelType(ctx,type.value,node)
                    }
        
                }
                
                
            })
    
    
        })

    }
    
}

function reset() {
    type.value = "wall";
    drawingGrid = [];
    position = {};
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}