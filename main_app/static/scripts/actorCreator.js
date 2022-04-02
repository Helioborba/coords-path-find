import {City, Car} from '/static/scripts/actors.js';
import {CarState} from '/static/scripts/controls.js';
import {closestCity, citiesVisitedCount} from '/static/scripts/helpers.js';
import { controllables } from '/static/scripts/main.js';
/**
 * Desenha todas as cidades
 * @param {{name:string, x:int, y:int}} data Objeto do fetch recebido previamente
 */
export function createAllCities(canvasBg,ctxBg,data) { 
    const cities = [];
    data.map( (row) => {
        cities.push( new City(canvasBg, ctxBg, row.name, row.x, row.y));
    })
    return cities;
}

// Recebe a coordenada inicial e após coloca o resto
export function carStartPosition(initialCoord, canvas, ctx, cities) {
    // Cria o carro
    let objCar = new Car(canvas, ctx, initialCoord);
    console.log('initial ', initialCoord);
    const state = new CarState(initialCoord, controllables);
    state.setCurrentCoords(initialCoord.x, initialCoord.y);
    // Inicia o estado do carro, utilizado para fazer quase todas as operações de 'loop infinito'
    
    
    //  Essas funções devem permanecer dentro da carStartPosition senão os dados estaram nulos
    function move() {
        let closest = closestCity(state.currentCoords, cities, state);
        let targetCity = cities.find(x => x.name === closest.name);  // retorna o objeto da cidade
        targetCity.setIsTarget(); // colocar a cidade alvo
        state.setCurrentTarget(targetCity);
        objCar.init(closest.coords_x, closest.coords_y, targetCity, state);
    }
    
    // No momento esta função não faz nada
    function idle() {
        state.actionIdle();
        console.log('No next city, idling..');
    }

    function stopped() {
        console.log('doing nothing, totally stoped');
    }
    // para o veiculo atual momentaneamente
    window.stop = function stop(e) {
        if (state.stopped) {
            console.log('iniciou');
            // avisa o estado que esta voltando a mover e re-calcula a distância
            state.setStopped(false);
            move();
            e.textContent = 'Parar veículo';
        } else {
            console.log('parou')
            e.textContent = 'Iniciar veículo';
            state.setStopped(true);
        }
    }

    /**
     * A função mais importante do projeto. 
     * Ela mantem o carro rodando até TODAS AS CIDADES serem vistas.
     * É basicamente um loop infinito, a ideia aqui é utilizar callbacks para manter o sistema rodando
     * Todo esse trabalho é dado por não se poder utilizar o while que não gosta de async
     */
    function cicles() {
        //  Faz o loop até o carro achar a primeira parada (primeiro loop é especial!) e após continua o loop movendo até as próximas cidades 
        citiesVisitedCount(cities, state); // apenas para não causar bugs de undefined no final das rotas
        if (state.stopped === false) {
            if( state.targetReached === false && state.targetsLeft > 0 ) {
                setTimeout(cicles,[400]);
            } else if ( state.targetsLeft > 0 ) {
                state.setTargetReached(false);
                move();
                setTimeout(cicles,[400]);
            } else {
                idle();
                setTimeout(cicles,[4000]);
            };
        } else {
            stopped();
            setTimeout(cicles,[3000]);
        }
    }

    // Aqui é o 'chute' inicial do estado, temos que inicializar dessa forma pois o carro não pode estar idle da primeira vez
    // **O novo carro nunca vai ser idle**
    // Por isso, precisamos checar se há cidades primeiro e caso não tenha, ai deviamos utilizar um idle
    citiesVisitedCount(cities, state);
    if(state.targetsLeft > 0) {
        move();
        cicles();
    } else {
        console.log('No city to go to!');
        // colocar idle aqui
    }
}