matrix = [];
var side = 14;
var action = '';
// Initial width and height must be greater or equal than 3
var matrixWidth = 18;
var matrixHeight = 18;
matrixWidth = matrixWidth > 3 ? matrixWidth * 2 + 1 : 7;
matrixHeight = matrixHeight > 3 ? matrixHeight * 2 + 1 : 7;

var sx, sy, ex, ey;
var path = [];
var step = 0;

// Generating an empty matrix 
function newMatrix() {
    for (let i = 0; i < matrixHeight; i++) {
        matrix[i] = [];
        for (let j = 0; j < matrixWidth; j++) {
            matrix[i][j] = 0;
            if (i == 0 || i == matrixHeight - 1 || j == 0 || j == matrixWidth - 1) {
                matrix[i][j] = 'wall';
            }
        }
    }
}
newMatrix()

function setup() {
    createCanvas(matrixWidth * side + 2, matrixHeight * side + 2);
    frameRate(10);
    stroke('#3355aa');
    strokeWeight(2);
}

function draw() {
    let isStart = false;
    let isEnd = false;
    for (let y in matrix) {
        for (let x in matrix) {
            if (matrix[y][x] == 'wall') {
                fill('#35a');
            } else if (matrix[y][x] == 'start') {
                fill('#fa0');
                isStart = true;
            } else if (matrix[y][x] == 'end') {
                fill('#8c0');
                isEnd = true;
            } else if (matrix[y][x] == 'move') {
                fill('#b5d');
            } else if (matrix[y][x] == 0) {
                fill('#fff');
            } else {
                fill('#8dd');
            }
            rect(x * side + 1, y * side + 1, side, side);
        }
    }
    document.getElementById('visualize').disabled = !(isStart && isEnd && action == '');
    if (action == 'selectStartNode') {
        fill('#fa0');
        rect(Math.floor(mouseX / side) * side + 1, Math.floor(mouseY / side) * side + 1, side, side);
    }
    if (action == 'selectEndNode') {
        fill('#8c0');
        rect(Math.floor(mouseX / side) * side + 1, Math.floor(mouseY / side) * side + 1, side, side);
    }
    if (dijkstraInProgress) {
        let d = dijkstra(action);
        if (d.x) {
            matrix[d.y][d.x] = 'move';
        }
    }
    if (breathInProgress) {
        let b = breath(action);
        if (b.x) {
            matrix[b.y][b.x] = 'move';
        }
    }
    if (swarmInProgress) {
        let s = swarm(action);
        if (s.x) {
            matrix[s.y][s.x] = 'move';
        }
    }
    if (bidirectionalInProgress) {
        let b = bidirectional(action);
        if (b.x) {
            matrix[b.y][b.x] = 'move';
        }
    }
    if (depthInProgress) {
        let d = depth(action);
        if (d.x) {
            matrix[d.y][d.x] = 'move';
        } else {
            let d = depth(action);
            if (d.x) {
                matrix[d.y][d.x] = 'move';
            } else {
                let d = depth(action);
                if (d.x) {
                    matrix[d.y][d.x] = 'move';
                }
            }
        }
    }
    if (greedyInProgress) {
        let g = greedy(action);
        if (g.x) {
            matrix[g.y][g.x] = 'move';
        } else {
            let g = greedy(action);
            if (g.x) {
                matrix[g.y][g.x] = 'move';
            } else {
                let g = greedy(action);
                if (g.x) {
                    matrix[g.y][g.x] = 'move';
                }
            }
        }
    }
}
function mousePressed() {
    if (action == 'selectStartNode') {
        if (matrix[Math.floor(mouseY / side)]) {
            if (matrix[Math.floor(mouseY / side)][Math.floor(mouseX / side)] == 0) {
                for (let y in matrix) {
                    for (let x in matrix) {
                        if (matrix[y][x] == 'start') {
                            matrix[y][x] = 0;
                        }
                    }
                }
                matrix[Math.floor(mouseY / side)][Math.floor(mouseX / side)] = 'start';
                sx = Math.floor(mouseX / side);
                sy = Math.floor(mouseY / side);
                action = '';
            } else {
                fill('#f20');
                rect(Math.floor(mouseX / side) * side + 1, Math.floor(mouseY / side) * side + 1, side, side);
            }
        } else {
            fill('#f20');
            rect(Math.floor(mouseX / side) * side + 1, Math.floor(mouseY / side) * side + 1, side, side);
        }
    }
    if (action == 'selectEndNode') {
        if (matrix[Math.floor(mouseY / side)]) {
            if (matrix[Math.floor(mouseY / side)][Math.floor(mouseX / side)] == 0) {
                for (let y in matrix) {
                    for (let x in matrix) {
                        if (matrix[y][x] == 'end') {
                            matrix[y][x] = 0;
                        }
                    }
                }
                matrix[Math.floor(mouseY / side)][Math.floor(mouseX / side)] = 'end';
                ex = Math.floor(mouseX / side);
                ey = Math.floor(mouseY / side);
                action = '';
            } else {
                fill('#f20');
                rect(Math.floor(mouseX / side) * side + 1, Math.floor(mouseY / side) * side + 1, side, side);
            }
        } else {
            fill('#f20');
            rect(Math.floor(mouseX / side) * side + 1, Math.floor(mouseY / side) * side + 1, side, side);
        }
    }
}
function selectStartNode() {
    clearMatrix();
    action = 'selectStartNode';
}
function selectEndNode() {
    clearMatrix();
    action = 'selectEndNode';
}

function visualize() {
    if (document.getElementById('algorithms').value == 'dijkstra') {
        dijkstra('start');
    }
    if (document.getElementById('algorithms').value == 'greedy') {
        greedy('start');
    }
    if (document.getElementById('algorithms').value == 'swarm') {
        swarm('start');
    }
    if (document.getElementById('algorithms').value == 'bidirectional') {
        bidirectional('start');
    }
    if (document.getElementById('algorithms').value == 'breath') {
        breath('start');
    }
    if (document.getElementById('algorithms').value == 'depth') {
        depth('start');
    }
}

function clearMatrix() {
    for (let y in matrix) {
        for (let x in matrix) {
            if (typeof matrix[y][x] == 'number') {
                matrix[y][x] = 0;
            }
            if (matrix[y][x] == 'move') {
                matrix[y][x] = 0;
            }
            if (matrix[y][x] == 'check' || matrix[y][x] == 'check_') {
                matrix[y][x] = 0;
            }
            if (matrix[y][x] == 'checkE' || matrix[y][x] == 'checkE_') {
                matrix[y][x] = 0;
            }
        }
    }
}