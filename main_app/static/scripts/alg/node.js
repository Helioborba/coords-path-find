export class Node {
    constructor(id, size, posx, posy, walkable, ctx, startPoint, endPoint) {
        this.inPath = false;
        this.getGCost = this.getValueG;
        this.getHCost = this.getValueH;
        this.size = size;
        this.posx = posx;
        this.posy = posy;
        this.walkable = walkable;
        this.gctx = ctx;
        this.id = id;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
  
    // createStartNode() {
    //     drawCar(this.gctx, this, 2, "black", "blue");
    // }
    // createEndNode() {
    //     drawCar(this.gctx, this, 2, "black", "red");
    // }

    toggleWalkable() {
        this.walkable = !this.walkable;
    }

    getValueF() {
        // Isso é um problema
        let fValue = (this.getValueH()) + (this.getValueG());
        return (fValue);
    }

    getValueH() {
        let endNodePosition = {
            posx: this.endPoint.x,
            posy: this.endPoint.y
        };
        return (getDistance(this, endNodePosition));
    }
    
    getValueG() {
        let startPointPosition = {
            posx: this.endPoint.x,
            posy: this.endPoint.y
        };
        return (getDistance(this, startPointPosition));
    }

    drawPath() {
        drawCar(this);
    }

    clearPath() {
        clearCar(this)
    }

    createWall() {
      nodeDrawer(this.gctx, this, 2, "black", "black");
    }
    // drawOpenNode() {
    //   drawCar(this.gctx, this, 2, "black", "green");
    // }
    // drawClosedNode() {
    //   drawCar(this.gctx, this, 2, "black", "pink");
    // }
    

    // USADO APENAS PARA DEBUG!
    // drawNode() {
    //     this.gctx.beginPath();
    //     // Usado para criar as linhas do grid
    //     this.gctx.lineWidth = "2";
    //     this.gctx.strokeStyle = "black";
    //     this.gctx.fillStyle = "white";
    //     this.gctx.fillRect(this.posx, this.posy, this.size, this.size);
    //     this.gctx.rect(this.posx, this.posy, this.size, this.size);
    //     this.gctx.closePath();
    //     this.gctx.stroke();
    //     if (this.inPath === true) {
    //         this.drawPath();
    //     }
    //     if (this.walkable === false) {
    //         this.createWall();
    //         return;
    //     }
    //     
    //     if (this.posx == this.startPoint.x && this.posy == this.startPoint.y) {
    //         this.createStartNode();
    //         return;
    //     }
    //     if (this.posx == this.endPoint.x && this.posy == this.endPoint.y) {
    //         this.createEndNode();
    //     }
    // }
}


// informa a tela como desenhar o carro
function drawCar(target) {
    target.gctx.translate(0,0);
    const image = new Image();
    image.src = "/static/images/32-car-house.png";
    image.onload = () => {
        // O -16 é utilizado para calcular o espaço causado quando cortamos a sprite (32x32), para assim ajustar a imagem
        target.gctx.drawImage(image, 0, 0, 32, 32, (target.posx - 16), (target.posy - 16), 32, 32);
    }
}

function nodeDrawer(context, target, lineW, strokeS, fillS) {
    context.beginPath();
    context.lineWidth = lineW;
    context.strokeStyle = strokeS;
    context.fillStyle = fillS;
    context.fillRect(target.posx, target.posy, target.size, target.size);
    context.rect(target.posx, target.posy, target.size, target.size);
    context.closePath();
    context.stroke();
  }

// Instrução para a tela de como limpar as instâncias do veiculo
// O problema desse método é caso os veiculos estejam próximos demais, cortando parte do outro
// Tenho uma ideia de como arrumar isso
// Teriamos de criar um canvas a cada carro criado, assim o overlay deles ia ficar correto, o unico problema ia ser a performance de criar um canvas novo a cada carro criado.
// function clearCar(target) {
//     target.gctx.clearRect( (target.posx - 16), (target.posy - 16), 32, 32);
// }
// esta versão deleta o canvas por completo, diferente da acima que apenas limpa o último campo apenas
function clearCar(target) {
    target.gctx.clearRect( (target.posx - 60), (target.posy - 60), 160, 160);
}


// Distância entre nós
function getDistance(nodeA, nodeB) {
    let distX = Math.abs(nodeA.posx - nodeB.posx);
    let distY = Math.abs(nodeA.posy - nodeB.posy);
  
    if (distX > distY) {
      return ( (14 * distY) + (10 * (distX - distY)))
    }
    return ( 14 * distX + (10 * (distY - distX)));
}