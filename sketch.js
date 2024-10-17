let elements = [
  { symbol: "H", name: "Hydrogen", group: 1, period: 1 },    // 水素
  { symbol: "He", name: "Helium", group: 18, period: 1 },    // ヘリウム
  { symbol: "Li", name: "Lithium", group: 1, period: 2 },    // リチウム
  { symbol: "Be", name: "Beryllium", group: 2, period: 2 },  // ベリリウム
  { symbol: "B", name: "Boron", group: 13, period: 2 },      // ホウ素
  { symbol: "C", name: "Carbon", group: 14, period: 2 },     // 炭素
  { symbol: "N", name: "Nitrogen", group: 15, period: 2 },   // 窒素
  { symbol: "O", name: "Oxygen", group: 16, period: 2 },     // 酸素
  { symbol: "F", name: "Fluorine", group: 17, period: 2 },   // フッ素
  { symbol: "Ne", name: "Neon", group: 18, period: 2 },      // ネオン
];

let grid = [];
let elementSize = 50;
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(18);

  // 周期表のグリッドを作成（18列7行）
  for (let i = 0; i < 18; i++) {
    grid[i] = [];
    for (let j = 0; j < 7; j++) {
      grid[i][j] = null;
    }
  }

  // 元素をランダムに配置
  for (let element of elements) {
    element.x = random(width - elementSize);
    element.y = random(height - elementSize);
  }
}

function draw() {
  background(220);

  // 周期表のグリッドを描画
  drawGrid();

  // 元素を描画
  for (let element of elements) {
    if (element !== draggedElement) {
      drawElement(element);
    }
  }

  // ドラッグ中の元素を描画
  if (draggedElement) {
    drawElement(draggedElement, mouseX - offsetX, mouseY - offsetY);
  }
}

// 周期表のグリッドを描画
function drawGrid() {
  stroke(0);
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 2; j++) {  // 2段目まで描画
      fill(255);
      rect(i * elementSize, j * elementSize, elementSize, elementSize);
    }
  }
}

// 元素を描画
function drawElement(element, x = element.x, y = element.y) {
  fill(100, 200, 255);
  rect(x, y, elementSize, elementSize);
  fill(0);
  textAlign(CENTER, CENTER);
  text(element.symbol, x + elementSize / 2, y + elementSize / 2);
}

// マウス押下時に元素をドラッグ
function mousePressed() {
  for (let element of elements) {
    if (
      mouseX > element.x &&
      mouseX < element.x + elementSize &&
      mouseY > element.y &&
      mouseY < element.y + elementSize
    ) {
      draggedElement = element;
      offsetX = mouseX - element.x;
      offsetY = mouseY - element.y;
      break;
    }
  }
}

// マウスを離したときに元素をグリッドにドロップ
function mouseReleased() {
  if (draggedElement) {
    let gridX = floor(mouseX / elementSize);
    let gridY = floor(mouseY / elementSize);

    // 2段目までの位置チェック
    if (gridX >= 0 && gridX < 18 && gridY >= 0 && gridY < 2) {
      draggedElement.x = gridX * elementSize;
      draggedElement.y = gridY * elementSize;
      grid[gridX][gridY] = draggedElement;
    } else {
      // グリッド外なら元の位置に戻す
      draggedElement.x = random(width - elementSize);
      draggedElement.y = random(height - elementSize);
    }

    draggedElement = null;
  }
}
