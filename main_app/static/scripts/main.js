import {drawAllCities, drawCar} from '/static/scripts/canvaEvents.js';
import {getCursorPosition,Controllables,roundTen} from '/static/scripts/controls.js';
import {createAllCities} from '/static/scripts/actorCreator.js';

// Criação de um objeto com os html (estado e progresso)
let action = document.getElementById('action'); // estado atual
let progressBar = document.getElementById('progressBar');
export const controllables = new Controllables(action, progressBar);

// Existem dois backgrounds, um para animação e um para o background
let canvasBg = document.getElementById('background'); // BG
let ctxBg = canvasBg.getContext('2d');
let canvas = document.getElementById('animations'); // Anims
let ctx = canvas.getContext('2d');

var cities = null; // Não utilizar const para este caso em específico

fetch('/temp/list', { method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',} })
.then( res => res.json())
.then( (data) => {
    cities = createAllCities(canvasBg, ctxBg, data);
    drawAllCities(canvasBg, ctxBg, cities);
})
.catch(err => console.log(err))




// Funções importadas direto ao app estão abaixo

// criar o veículo, seria bom colocar uma forma de pegar de acordo com o usuário o local inicial
window.add = function add(e) {
    // faz o botão de parar o veículo retornar ao normal
    let stopButton = document.getElementById('stop');
    stopButton.disabled = false;
    // desativar o botão adicionar e enviar os dados para o desenho do carro
    e.disabled = true;
    let initialCoord = { x: 30, y: 30}; // hardcoded no momento, antes utilizamos a função get position on click do helpers
    drawCar(initialCoord, canvas, ctx, cities);
}

// usado para resetar as cidades visitadas
window.reset = function reset(e) {
    // If caso não haja ainda dados
    if (cities !== null) {
        ctxBg.restore();
        ctxBg.save();
        ctxBg.fillStyle = "white";
        ctxBg.fillRect(0, 0, canvasBg.width, canvasBg.height);
        cities.map( (city) => {
            e.disabled = true;
            city.resetVisited();
            setTimeout(
                () => {
                    e.disabled = false;
                },[1200]
            )
        })
    } else {
        e.disabled = true;
        setTimeout(
            () => {
                e.disabled = false;
            },[1200]
        )
    }
}

// Pack the coord array
export const COORDS_ARRAY = [];

document.getElementById("rivers").addEventListener("click", function(event) {
    canvas.style.cursor = 'pointer';
    canvas.addEventListener('click', function(event) {
        let cursorCoord = getCursorPosition(canvas, event);
        let roundedCoord = {posx: roundTen(cursorCoord.x), posy: roundTen(cursorCoord.y)};
        COORDS_ARRAY.push(roundedCoord);
        ctxBg.restore();
        ctxBg.save();
        ctxBg.strokeStyle = "#0000FF";
        ctxBg.strokeRect(roundTen(cursorCoord.x) - 10, roundTen(cursorCoord.y) - 10, 10, 10);
    })
});