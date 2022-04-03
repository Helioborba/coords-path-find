import { COORDS_ARRAY } from "/static/scripts/main.js";
// Essa parte necessita de refatoração, assim como as outras dentro do Algoritmo
/**
 * Cria o grid do movimento e também os bloqueios
 */
export class Grid {
    constructor(width, height, posx, posy, ctx, startPoint, endPoint, nodesize) { 
        this.width = width + 5; // +5 previne o usuário de clicar fora do canvas(pontos não considerados) e quebrar o grid
        this.height = height + 5;
        this.posx = posx;
        this.posy = posy;
        this.gctx = ctx;
        this.gridPointsByPos = [];
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.nodesize = nodesize;
    }
    
    /**
     * Recebe uma função para criar os objetos do nó e retorna a posição do grid
     */
    createGrid(createNodeObj) {
        let tempNode;
        let countNodes = 0;
        // this.gctx.beginPath();
        // this.gctx.lineWidth = "1";
        // this.gctx.strokeStyle = "black";
        // this.gctx.rect(0, 0, this.width, this.height);
        // this.gctx.stroke();
        this.gridPoints = [];
        console.log(COORDS_ARRAY);
        for (let i = 0; i < this.width; i += this.nodesize) {
            this.gridPointsByPos[i] = [];
    
            for (let j = 0; j < this.height; j += this.nodesize) {
                this.gridPointsByPos[i][j] = countNodes;
                //tem um problema de movimento aqui
                tempNode = createNodeObj(countNodes, i, j, true);
                if (COORDS_ARRAY.some(coord_river => coord_river.posx === tempNode.posx  && coord_river.posy === tempNode.posy )) {
                    console.log('has');
                    tempNode.walkable = false;
                    /* vendors contains the element we're looking for */
                }
                // Aqui colocamos bloqueios como rios ou prédios
                // if (countNodes === 53 || countNodes === 93 || countNodes === 133 || countNodes === 173 || countNodes === 213 || countNodes === 253 || countNodes === 293 || countNodes === 333) {
                //     tempNode.walkable = false;
                // }
                // if (wallSet.has(countNodes)) {
                //     console.log("wallSet had countNodes!")
                //     tempNode.walkable = false;
                // }
        
                // tempNode.drawNode();
                tempNode.F = tempNode.getValueF();
                this.gridPoints.push(tempNode);
        
                countNodes++;
            }
        }
        return [this.gridPoints,this.gridPointsByPos]
    }
}

