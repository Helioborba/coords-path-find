import {drawAllCities} from '/static/scripts/canvaEvents.js';
import {createAllCities} from '/static/scripts/actorCreator.js';
import {drawCar} from '/static/scripts/canvaEvents.js';

// Existem dois backgrounds, um para animação e um para o background
let canvasBg = document.getElementById('background'); // BG
let ctxBg = canvasBg.getContext('2d');
let canvas = document.getElementById('animations'); // Anims
let ctx = canvas.getContext('2d');


fetch('/temp/list', { method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',} })
.then( res => res.json())
.then( (data) => {
    const cities = createAllCities(canvasBg, ctxBg, data);
    drawAllCities(canvasBg, ctxBg, cities);
    drawCar(canvas, ctx, cities)
})
.catch(err => console.log(err))



