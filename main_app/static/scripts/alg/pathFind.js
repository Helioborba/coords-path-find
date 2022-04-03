/**
 * O algoritmo principal, necessita do Grid, a Cidade e o estado do carro
 * Faz o calculo do ponto inicio ao final e APÓS desenha os carros do ponto final ao inicial
 */
export class PathAlgorithm {
    constructor(grid, startNode, endNode, gridPoints, gridPointsByPos, canvas, cities, nodesize, state) { // A quantidade de 'this' aqui é absurdo
        this.grid = grid;
        this.gridPoints = gridPoints;
        this.gridPointsByPos = gridPointsByPos;
        this.startNode = gridPointsByPos[startNode.x][startNode.y];
        this.endNode = gridPointsByPos[endNode.x][endNode.y];
        this.currentNode = null;
        this.canvas_height = canvas.height + 5; // +5 +5 previne o usuário de clicar fora do canvas(pontos não considerados) e quebrar o grid
        this.canvas_width = canvas.width + 5;
        this.city = cities;
        this.openSet = new Set();
        this.closedSet = new Set();
        this.nodesize = nodesize;
        this.state = state;
    }
    
    // Calcula os nós parentes
    getNeighbors(node) {
        let checkX, checkY; 
        let neighborList = []; 
        let tempList = []; 
        let nodesize = this.nodesize;

        for (let x = -nodesize; x <= nodesize; x += nodesize) {
            for (let y = -nodesize; y <= nodesize; y += nodesize) {
                if (x == 0 && y == 0) {
                    continue;
                }
                checkX = node.posx + x;
                checkY = node.posy + y;
    
                if (checkX >= 0 && checkX <= this.canvas_width - nodesize && checkY >= 0 && checkY <= this.canvas_height - nodesize) {
    
                    tempList.push(this.gridPointsByPos[checkX][checkY]);
                }
            }
        }
        neighborList = tempList;
        return (neighborList);
    }
    
    findPath() {
        let paths = [];
        this.state.setSearchingTarget(); // apenas para novelty se me entende
        const openSet = this.openSet;
        const closedSet = this.closedSet;
        let currentNode = this.startNode; // O nó atual, o nó primário é o padrão no caso
        let endNode = this.gridPoints[this.endNode]; // O nó alvo
        let startNode = this.gridPoints[this.startNode];
        let tempArray, newMovementCost;

        openSet.add(this.gridPoints[currentNode]);
        let gridPoints = this.gridPoints;
        while (openSet.size > 0) {
            tempArray = Array.from(openSet);
            currentNode = tempArray[0];
    
            for (let i = 1; i < tempArray.length; i++) {
            // Esse if é para criar os bloqueios.
                if ( tempArray[i].getValueF() < currentNode.getValueF() || tempArray[i].getValueF() == currentNode.getValueF() && tempArray[i].getValueH() < currentNode.getValueH()) {
                    currentNode = tempArray[i]; // atribui o nó atual para openSet caso o menor F tiver o menor valor ou an = F caso o lower HCost for o menor.
                }
            }   
  
            // Encerra o loop com o valor do menor F ou  a combinação entre os valores H e F 
            openSet.delete(currentNode);
            // currentNode.drawClosedNode();
            closedSet.add(currentNode);
            paths.push(currentNode);
            // Usado em Debug
            // if (currentNode.id == startNode.id) {
            //     currentNode.drawNode();
            // }
            // if (currentNode.id == endNode.id) {
                
            //     currentNode.drawNode();
            // }
            // if (currentNode.walkable == false) {
            //     console.log('draw')
            //     currentNode.drawNode();
            // }
            
            // Quando chegar no último ponto o loop é encerrado e começamos a desenhar o percurso.
            if ( currentNode.id == endNode.id) {
                retracePath(startNode, endNode, this.city, this.state, (closedSet.size - 1)); // O tamanho do set deve ser -1 para o numero de iteração funcionar 
                // return;
                break;
            }
            this.getNeighbors(currentNode).forEach( function(neighbor) {
                let neighborNode = gridPoints[neighbor];
                let neighborH = neighborNode.getHCost();
                let neighborG = neighborNode.getGCost();
                let currentG = currentNode.getGCost();
        
                if ( !neighborNode.walkable || closedSet.has(neighborNode)) {
                    return; //serve como continuação para não rechecar se tem bloqueio
                }
    
                newMovementCost = currentG + ( getDistance(currentNode, neighborNode));
        
                if ( newMovementCost < neighborG || !openSet.has(neighborNode)) {
                    neighborNode.gCost = newMovementCost;
                    neighborNode.hCost = neighborH;
                    neighborNode.parent = currentNode;
                    // Envia o nó vizinho ao array para fazer checagem se há valores próximos e os desenha
                    if (!openSet.has(neighborNode)) {
                        openSet.add(neighborNode);
                        // neighborNode.drawOpenNode(); // apenas debug
                    }
                }
            })
        }
    }
}

/**
 * Usado para calcular a distância entre nós
 */
function getDistance(nodeA, nodeB) {
    let distX = Math.abs(nodeA.posx - nodeB.posx);
    let distY = Math.abs(nodeA.posy - nodeB.posy);
  
    if (distX > distY) {
      return ((14 * distY) + (10 * (distX - distY)))
  
    }
    return (14 * distX + (10 * (distY - distX)));
  }


// Usado na função de delay do desenho do caminho
const timer = ms => new Promise(res => setTimeout(res, ms)); 

/**
 *  Aqui é onde de fato é desenhado o caminho, também serve como sinal caso a cidade seja visitada e onde se encontra o carro
 */ 
async function retracePath(startNode, endNode, city, state, totalNodes) {
    // let path = new Set();
    var currentNode = endNode;
    var previousNode;
    var totalNodes = state.progress.totalNodes || totalNodes;
    var iterator = state.progress.iterator || 0;
    // Desenha a cidade enquanto ela ainda não foi visitada, senão o carro muda de alvo após ser pego os dados de localização no momento
    while (currentNode !== startNode && city.visited !== true && !state.stopped) {
        state.setMoving(true);
        // path.add(currentNode); // o caminho final com todas as coordenadas
        previousNode = currentNode;
        currentNode = currentNode.parent;
        state.setCurrentCoords(currentNode.posx, currentNode.posy);
        currentNode.inPath = true;
        if (currentNode != previousNode) {
            previousNode.clearPath();
        }
        if (currentNode != startNode) {
            iterator += 1;
            state.setProgressBar(Math.round(100 * (iterator / totalNodes)));
            state.setProgress({iterator:iterator, totalNodes:totalNodes});
            currentNode.drawPath();
            await timer(60); // Aqui é o delay da animação (no caso desenhar e deletar, criando sensação de movimento na tela)
        }
    }

    
    // O clear time roda pela última vez ao chegar na cidade (ou se ela for visitada), então temos que re-desenhar o carro após o termino dos desenhos, para ele permanecer no local ao invés de sumir espontaneamente
    currentNode.drawPath();
    state.setCurrentCoords(currentNode.posx, currentNode.posy)
    if (!state.stopped) {
        state.setProgress({iterator:0, totalNodes:0});
        // Estas 3 últimas linhas são o pilar do sistema; pegar a coordenada atual do carro, colocar que a cidade atual foi visitada e mudar o estado do carro para idle
        state.setProgressBar(100);
        city.setVisited(true);
        state.setTargetReached(true); // <<<<<< Significa 'Idle' esta linha
    }
}
