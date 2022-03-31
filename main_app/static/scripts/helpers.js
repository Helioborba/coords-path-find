/**
 * Calcula a cidade mais próxima ao colocar o carro
 * @param {{x:int, y:int}} carStartPos
 * @param {Array} cities Array de objetos
 * @param {object} state Array de objetos
 * @return {string} Retorna o nome da cidade mais próxima
 */
export function closestCity (carStartPos, cities, state){
    let closest;
    let start = { x: carStartPos.x, y: carStartPos.y };

    function distance(point) {
        return Math.sqrt(Math.pow(start.x - point.coords_x, 2) + Math.pow(start.y - point.coords_y, 2))
    }
    
    citiesVisitedCount(cities, state)
    cities = cities.filter((a) => a.visited === false && a); // Ainda é necessário checar se as cidades foram visitadas, mesmo após filtrar acima, senão a mais próxima sera sempre a primeira 

    if (state.targetsLeft > 1) {
        closest = cities.reduce( (a, b) => distance(a) < distance(b) ? a : b );
    } else {
        // Pega o último valores restante; é super importante para não quebrar o programa
        closest = cities.filter((a) => a.visited === false && a);
        closest = closest[0];
    }

    return closest;
}

export function citiesVisitedCount(cities, state) {
    cities = cities.filter((a) => a.visited === false && a); // achar todas as cidades ainda não visitadas
    state.setTargetsLeft(cities.length);
}