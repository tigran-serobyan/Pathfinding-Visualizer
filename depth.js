var depthInProgress = false;
var cx, cy;
function depth(state) {
    if (state == 'start') {
        cx = sx;
        cy = sy;
        path = [];
        depthInProgress = true;
        action = 'find';
        clearMatrix();
    }
    if (state == 'find') {
        let deadend = true;
        if (matrix[cy - 1][cx] == 0) { matrix[cy - 1][cx] = 1; deadend = false; cy -= 1; path.push({ x: cx, y: cy }); }
        else if (matrix[cy][cx + 1] == 0) { matrix[cy][cx + 1] = 1; deadend = false; cx += 1; path.push({ x: cx, y: cy }); }
        else if (matrix[cy + 1][cx] == 0) { matrix[cy + 1][cx] = 1; deadend = false; cy += 1; path.push({ x: cx, y: cy }); }
        else if (matrix[cy][cx - 1] == 0) { matrix[cy][cx - 1] = 1; deadend = false; cx -= 1; path.push({ x: cx, y: cy }); }
        if (matrix[cy - 1][cx] == 'end') { action = 'show'; return true; }
        if (matrix[cy + 1][cx] == 'end') { action = 'show'; return true; }
        if (matrix[cy][cx - 1] == 'end') { action = 'show'; return true; }
        if (matrix[cy][cx + 1] == 'end') { action = 'show'; return true; }
        if (deadend) {
            while (matrix[cy - 1][cx] != 0 && matrix[cy][cx + 1] != 0 && matrix[cy + 1][cx] != 0 && matrix[cy][cx - 1] != 0) {
                path.pop();
                cx = path[path.length - 1].x;
                cy = path[path.length - 1].y;
            }
        }
        return false;
    }
    if (state == 'show') {
        let move = path[0];
        path.splice(0, 1);
        if (path.length == 0) {
            depthInProgress = false;
            action = '';
            for (let y in matrix) {
                for (let x in matrix) {
                    if (typeof matrix[y][x] == 'number') {
                        matrix[y][x] = 0;
                    }
                }
            }
        }
        return move;
    }
    return false;
}