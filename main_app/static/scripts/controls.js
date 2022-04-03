/**
 * Pega a posição atual do cursor baseada no canvas
 */
export function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x: x, y: y}
}

export function roundTen(num) {
    return Math.ceil(num / 5) * 5;
}
/**
 * Estado atual do carro, este objeto deve ser incorporado ao objeto carro eventualmente
 * Necessita do objeto correspondente a label para ir modificando
 */
export class CarState {
    constructor(currentCoords, controllables) {
        this.currentCoords = currentCoords;
        this.currentTarget = null; // Objeto da cidade alvo
        this.isMoving = false;
        this.idle = false;
        this.stopped = false; // Não confundir com iddle
        this.searchingTarget = false;
        this.targetsLeft = 0;
        this.targetReached = false;
        this.controllables = controllables; // Objeto do html
        this.initialCity = null; // cidade inicial
        this.progress = {iterator:null, totalNodes:null}; // apenas para colocar a porcentagem já rodada
    }

    /** Utilidade e informaçãoo: Objeto da cidade atual */
    setCurrentTarget(city) {
        this.initialCity = this.currentTarget;
        this.currentTarget = city;
        this.idle = false;
    }

    setMoving(state) {
        this.isMoving = state;
        this.idle = !state;
        this.controllables.setAction(`Em rota para: ${this.currentTarget.name}.`);
        this.controllables.setProgressBar();
    }  

    actionIdle() {
        this.idle = true;
        this.isMoving = false;
        this.controllables.setAction(`Parado na cidade de ${this.currentTarget.name}.`);
    }

    setStopped(state) {
        this.targetReached = false;
        this.stopped = state; // Não confundir com iddle
        if (state) { // Casos do local próximo
            if( ( Math.round(100 * (this.progress.iterator / this.progress.totalNodes)) ) >= 70 ) {
                this.controllables.setAction(`Parado próximo ao alvo: ${this.currentTarget.name}.`);
            } else if ( ( Math.round(100 * (this.progress.iterator / this.progress.totalNodes)) ) <= 30) {
                this.controllables.setAction(`Parado próxima a cidade inicial de ${this.initialCity.name}.`);
            } else {
                this.controllables.setAction(`Parado a caminho da cidade de ${this.currentTarget.name}`);
            }
        }
    }
    
    setProgressBar(value) {
        this.controllables.setProgressBar(value);
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
    
    setProgress(value) {
        this.progress = {iterator:value.iterator, totalNodes:value.totalNodes};
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
        this.progressBar.textContent = `${value}%`;
        this.progressBar.style.width = `${value}%`;
    }

    setAction(value) {
        this.action.textContent = `Estado: ${value}`;
    }
}