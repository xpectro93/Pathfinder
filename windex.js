import Canvas from './Canvas.js'
let form = document.getElementById('gridForm');
    let gridSlider = document.getElementById("type");
    let mazeType = document.getElementById("mazeType");
    let type = document.getElementById('type');


let canvas = document.getElementById("root");

let elemObj =  { form, gridSlider, mazeType, type }

let newPath = new Canvas(elemObj, canvas);