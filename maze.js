//Generate a maze
function newMaze() {
    // Color outline and even points
    for (let i = 0; i < matrixHeight; i++) {
        for (let j = 0; j < matrixWidth; j++) {
            if (i == 0 || i == matrixHeight - 1 || j == 0 || j == matrixWidth - 1) {
                matrix[i][j] = 1;
            } else if (i % 2 == 0 && j % 2 == 0) {
                matrix[i][j] = 0.5;
            }
            else {
                matrix[i][j] = 0;
            }
        }
    }
    // Choose points in betwen two even points and connect to even points
    for (let i = 0; i < matrixWidth * matrixHeight / 32 - 1; i++) {
        let xIsOdd = Math.round(Math.random());
        let x = Math.floor(Math.random() * (matrixWidth - (xIsOdd ? 3 : 5)) / 2) * 2 + (xIsOdd ? 2 : 3);
        let y = Math.floor(Math.random() * (matrixHeight - (xIsOdd ? 5 : 3)) / 2) * 2 + (xIsOdd ? 3 : 2);
        matrix[y][x] = 1;
        if (xIsOdd) {
            matrix[y - 1][x] = 1;
            matrix[y + 1][x] = 1;
        } else {
            matrix[y][x - 1] = 1;
            matrix[y][x + 1] = 1;
        }
    }
    // Choose odd points and connect to wals or even points
    for (let i = 0; i < matrixWidth * matrixHeight / 32 - 1; i++) {
        let x = Math.floor(Math.random() * (matrixWidth - 1) / 2) * 2 + 1;
        let y = Math.floor(Math.random() * (matrixHeight - 1) / 2) * 2 + 1;
        matrix[y][x] = 1;
        if (x > 1 && x < matrixWidth - 2 && y > 1 && x < matrixHeight - 2) {
            let changeX = Math.round(Math.random() * 2) - 1;
            let changeY = (changeX == 0) ? Math.round(Math.random()) : -1;
            x += changeX;
            y += (changeY == 0) ? -1 : (changeY == 1) ? 1 : 0;
            matrix[y][x] = 1;
            if (x % 2 == 0) {
                matrix[y - 1][x] = 1;
                matrix[y + 1][x] = 1;
            } else {
                matrix[y][x - 1] = 1;
                matrix[y][x + 1] = 1;
            }
        }
    }

    // If area is dense remove a point, if it's not add a new one 
    for (let j = 2; j < matrixWidth - 2; j++) {
        for (let i = 2; i < matrixHeight - 2; i++) {
            let sum = matrix[i - 2][j - 2] + matrix[i - 1][j - 2] + matrix[i][j - 2] + matrix[i + 1][j - 2] + matrix[i + 2][j - 2] +
                matrix[i - 2][j - 1] + matrix[i - 1][j - 1] + matrix[i][j - 1] + matrix[i + 1][j - 1] + matrix[i + 2][j - 1] +
                matrix[i - 2][j] + matrix[i - 1][j] + matrix[i][j] + matrix[i + 1][j] + matrix[i + 2][j] +
                matrix[i - 2][j + 1] + matrix[i - 1][j + 1] + matrix[i][j + 1] + matrix[i + 1][j + 1] + matrix[i + 2][j + 1] +
                matrix[i + 2][j + 2] + matrix[i + 1][j + 2] + matrix[i][j + 2] + matrix[i + 1][j + 2] + matrix[i + 2][j + 2];
            if (matrix[i][j] == 0.5) {
                if (sum < 6) {
                    matrix[i][j] = 1;
                    let xIsOdd = Math.round(Math.random());
                    if (xIsOdd) {
                        matrix[i - 1][j] = 1;
                        matrix[i + 1][j] = 1;
                    } else {
                        matrix[i][j - 1] = 1;
                        matrix[i][j + 1] = 1;
                    }
                } else {
                    matrix[i][j] = 0;
                }
            } else {
                if (sum > 12) {
                    matrix[i][j] = 0;
                }
            }

            sum = matrix[i - 1][j] + matrix[i + 1][j] + matrix[i][j - 1] + matrix[i][j + 1];
            if(sum == 4){
                matrix[i][j] = 1;
            }
        }
    }

    for (let y in matrix) {
        for (let x in matrix[y]) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 'wall';
            }
        }
    }
}