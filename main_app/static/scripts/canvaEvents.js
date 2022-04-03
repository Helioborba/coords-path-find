import {carStartPosition} from '/static/scripts/actorCreator.js';
/**
 * Desenha todos os carros no canvas
 * @param {HTMLElement} canvas
 * @param {HTMLElement} ctxBg
 * @param {Array} cities Array com todas as cidades
 */
export function drawAllCities(canvasBg, ctxBg, cities){
    // O background é criado dentro do objeto da cidade
    // Isso é causado por algum bug que torna a área branca se não for na inicialização do OBJ
    ctxBg.fillStyle = "white";
    ctxBg.fillRect(0, 0, canvasBg.width, canvasBg.height);
    cities.map( (city) => {
        city.draw();
    })
}

/**
 * Usado para adicionar um novo carro, necessita das coordenadas do veículo inicial, da cidade mais próxima e o canvas para desenhar.
 * @param {{x:int, y:int}} initialCoord
 * @param {HTMLElement} canvas 
 * @param {HTMLElement} ctx
 * @param {{x:int, y:int}} closestCityCoords 
 */
export function drawCar(initialCoord, canvas, ctx, cities) {
    carStartPosition(initialCoord, canvas, ctx, cities);
}


// document.getElementById("resetRivers").addEventListener("click", function(event) {
//     resetWalls();
// })
