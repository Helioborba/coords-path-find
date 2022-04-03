// A função deste arquivo é deixar todos os objetos sendo criados em apenas um root para melhor organização
import { Node } from "/static/scripts/alg/node.js";
import { Grid } from "/static/scripts/alg/gridCreator.js";
import { PathAlgorithm } from "/static/scripts/alg/pathFind.js";



// Por que não utilizar extend?
// Não é necessário ter várias funções uma dentre a outra, senão teriamos um inferno de chamadas na área do pathFind
export default function startPath(canvas, ctx, startPoint, endPoint, cities, state) {
  let nodesize = 5;
  
  /** Essa função é utilizada para criar o nó enquanto recebe os dados do arquivo principal (main.js), assim podemos criar objetos lá pra frente no Grid */
  function createNodeObj(countNodes, i, j, walkable) {
    // função para criar o node com I,J
    const nodeObj = new Node(countNodes, nodesize, i, j, walkable, ctx, startPoint, endPoint);
    return nodeObj;
  }

  const gridObj = new Grid(canvas.width, canvas.height, 0, 0, ctx, startPoint, endPoint, nodesize);
  let points = gridObj.createGrid(createNodeObj);

  // No momento acho que devemos apenas passar o gridObj por precisarmos da função CreatGrid
  
  const pathAlgObj = new PathAlgorithm(gridObj, startPoint, endPoint, points[0], points[1], canvas, cities, nodesize, state);
  pathAlgObj.findPath();
}