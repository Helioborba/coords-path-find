/**
 * Pega a posição atual do cursor baseada no canvas
 */
export function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x: x, y: y}
}

/**
 * Estado atual do carro, este objeto deve ser incorporado ao objeto carro eventualmente
 * Necessita do objeto correspondente a label para ir modificando
 */
export class CarState {
    constructor(currentCoords, controllables) {
        this.currentCoords = currentCoords;
        this.currentTarget = null; // Objeto da cidade
        this.isMoving = false;
        this.idle = false;
        this.searchingTarget = false;
        this.targetsLeft = 0;
        this.targetReached = false;
        this.controllables = controllables; // Objeto do html
    }

    /** Utilidade e informaçãoo: Objeto da cidade atual */
    setCurrentTarget(city) {
        this.currentTarget = city;
        this.idle = false;
    }

    setMoving(state) {
        this.isMoving = state;
        this.idle = !state;
        this.controllables.setAction(`Em rota para ${this.currentTarget.name}.`);
    }  

    actionIdle() {
        this.idle = true;
        this.isMoving = false;
        this.controllables.setAction(`Parado na cidade de ${this.currentTarget.name}.`);
    }
    
    setSearchingTarget() {
        this.searchingTarget = true;
        this.idle = false;
        this.isMoving = false;
        this.controllables.setAction('Buscando cidade mais próxima...');
    }  
    /** Usado para manter sobre supervisão as coordenadas */
    setCurrentCoords(x, y) {
        this.currentCoords = {x:x, y:y};
    }

    getCurrentCoords() {
        return this.currentCoords;
    }

    setTargetsLeft(cities) {
        this.targetsLeft = cities;
    }

    setTargetReached(state) {
        this.targetReached = state;
    }  
    
}

/**
 * Utilizado para controlar as labels do estado do carro, assim como a barra de porcentagem.
 */
 export class Controllables {
    constructor(action, progressBar) {
        this.action = action;
        this.progressBar = progressBar;
    }

    setProgressBar(value) {
        this.progressBar = value;
    }

    setAction(value) {
        this.action.textContent = `Estado: ${value}`;
    }
}