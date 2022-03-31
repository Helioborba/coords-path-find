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
 */
export class CarState {
    constructor(currentCoords) {
        this.currentCoords = currentCoords;
        this.currentTarget = null;
        this.idle = false;
        this.targetsLeft = 0;
        this.targetReached = false
    }

    /** Utilidade e informaçãoo: Objeto da cidade atual */
    setCurrentTarget(city) {
        this.currentTarget = city;
    }

    /** Usado para manter sobre supervisão as coordenadas */
    setCurrentCoords(x, y) {
        this.currentCoords = {x:x, y:y};
    }

    getCurrentCoords() {
        return this.currentCoords;
    }
    actionIdle() {
        this.idle = true;
    }

    setTargetsLeft(cities) {
        this.targetsLeft = cities;
    }

    setTargetReached(state) {
        this.targetReached = state;
    }  
}