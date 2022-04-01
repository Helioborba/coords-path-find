import startPath from "/static/scripts/startPath.js";

export class City {
    constructor(canvasBg,ctxBg, name, x, y){
        this.ctx = ctxBg;
        this.canvas = canvasBg;
        this.name = name;
        this.coords_x = x;
        this.coords_y = y;
        this.visited = false;
        this.isTarget = false
        this.style = '#000000';
    }
    
    /**
     * Utilizado para desenhar o canvas do Background
     */
    draw() {
        this.ctx.restore()
        this.ctx.save()
        let path = new Path2D('M3 10v11h6v-7h6v7h6v-11L12,3z'); // Cria o SVG
        this.ctx.font = '10px serif'; // Criar a fonte do texto
        this.ctx.fillStyle = this.style; // Troca a cor da fonte que já é por padrão branco, que a torna invisível
        this.ctx.strokeStyle = this.style; // Esta cor é mudada caso seja visitada a cidade (padrão preto)
        this.ctx.fillText(this.name, (this.coords_x - 9), (this.coords_y - 9)); // Cria o texto independente do translate para se posicionar próximo a cidade
        this.ctx.translate((this.coords_x - 9 ), (this.coords_y - 10)); // troca o ponto onde desenhamos o SVG (cidade), temos de mudar todo hora isto usando o ctx.restore.
        this.ctx.stroke(path); // cria o SVG nas coordenadas já previamente designado
    }

    /**
     *  Troca a situação da cidade para visitado e redesenha ela com a cor verde, sinalizando que ela já foi visitada
     */ 
    setVisited() {
        this.visited = true;
        this.style = '#00FF00';
        this.draw();
    }
    
    resetVisited() {
        this.visited = false;
        this.style = '#000000';
        this.draw();
    }

    setIsTarget() {
        this.isTarget = true;
        this.style = '#FFFF00';
        this.draw();
    }
    repr() {
        return [ {name: this.name}, {x: this.x}, {y: this.y} ]
    }
}

// Essa classe pode ser mudada para conter o state, assim tirariamos a quantidade absurda de código this contida no algoritmo
export class Car {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        // Seria bom utilizar isto depois novamente
        // this.init_x = coords.x;
        // this.init_y = coords.y;
    }

    /** 
     * Inicia o carro; esta função move o ator até as coordenadas da cidade.
     */
    init(x, y, cities, state) {
        this.ctx.restore();
        this.ctx.save(); 
        
        // O algoritmo utilizado é A* (astar ou a estrela).
        // Primeiro o alg busca o caminho até o ponto final e calcula os nós dos pontos vizinhos, o ponto inicial é a cidade e o final é o carro.
        // O retrace vai mover o veiculo do ponto final ao inicial, cuidado com isso!
        
        // Essa função ajuda com o problema do grid e coordenadas, o grid é 5x5 então necessitamos fazer ele ficar entre 5
        // o Grid não funciona nas coordenadas 0-0, é o espaço seguro (offset).
        function roundTen(num) {
            return Math.ceil(num / 5) * 5;
        }
        let coords = state.getCurrentCoords();
        console.log(coords)
        // ponto da cidade mais próxima
        let packStartPoint = {x: roundTen(x), y: roundTen(y)}
        // Esse é o ponto inicial do carro
        let packEndPoint = {x: roundTen(coords.x), y: roundTen(coords.y)};
        
        startPath(this.canvas, this.ctx, packStartPoint, packEndPoint, cities, state);
    }  
}

/**
 * Utilizado para controlar as labels do estado do carro, assim como a barra de porcentagem.
 */
export class Controllables {
    constructor(label, statusBar) {
        this.label = label;
        this.statusBar = statusBar;
    }

    setStatusBar(value) {
        this.statusBa = value;
    }

    setLabel(value) {
        this.label = value;
    }
}