var greedyInProgress = false;
var cx, cy;
function greedy(state) {
    if (state == 'start') {
        cx = sx;
        cy = sy;
        path = [];
        greedyInProgress = true;
        action = 'find';
        clearMatrix();
    }
    if (state == 'find') {
        let order = [];
        if (Math.abs(cx - ex) > Math.abs(cy - ey)) {
            if (cx > ex) {
                if (cy > ey) {
                    order = ['left', 'top', 'bottom', 'right'];
                } else {
                    order = ['left', 'bottom', 'top', 'right'];
                }
            } else {
                if (cy > ey) {
                    order = ['right', 'top', 'bottom', 'left'];
                } else {
                    order = ['right', 'bottom', 'top', 'left'];
                }
            }
        } else {
            if (cx > ex) {
                if (cy > ey) {
                    order = ['top', 'left', 'right', 'bottom'];
                } else {
                    order = ['bottom', 'left', 'right', 'top'];
                }
            } else {
                if (cy > ey) {
                    order = ['top', 'right', 'left', 'bottom'];
                } else {
                    order = ['bottom', 'right', 'left', 'top'];
                }
            }
        }
        let deadend = true;
        for (let i = 0; i < order.length; i++) {
            if (matrix[cy - 1][cx] == 0 && order[i] == 'top') { matrix[cy - 1][cx] = 1; deadend = false; cy -= 1; path.push({ x: cx, y: cy }); break; }
            if (matrix[cy][cx + 1] == 0 && order[i] == 'right') { matrix[cy][cx + 1] = 1; deadend = false; cx += 1; path.push({ x: cx, y: cy }); break; }
            if (matrix[cy + 1][cx] == 0 && order[i] == 'bottom') { matrix[cy + 1][cx] = 1; deadend = false; cy += 1; path.push({ x: cx, y: cy }); break; }
            if (matrix[cy][cx - 1] == 0 && order[i] == 'left') { matrix[cy][cx - 1] = 1; deadend = false; cx -= 1; path.push({ x: cx, y: cy }); break; }
        }
        if (matrix[cy - 1][cx] == 'end') { action = 'found'; return true; }
        if (matrix[cy + 1][cx] == 'end') { action = 'found'; return true; }
        if (matrix[cy][cx - 1] == 'end') { action = 'found'; return true; }
        if (matrix[cy][cx + 1] == 'end') { action = 'found'; return true; }
        if (deadend) {
            while (matrix[cy - 1][cx] != 0 && matrix[cy][cx + 1] != 0 && matrix[cy + 1][cx] != 0 && matrix[cy][cx - 1] != 0) {
                path.pop();
                cx = path[path.length - 1].x;
                cy = path[path.length - 1].y;
            }
        }
        return false;
    }
    if (state == 'found') {
        for (let i = 0; i < path.length; i++) {
            let j = i;
            for (let k = path.length; k > j + 1; k--) {
                if (path[k]) {
                    if (Math.abs(path[j].x - path[k].x) + Math.abs(path[j].y - path[k].y) <= 1) { path.splice(j + 1, k - j - 1); continue; }
                }
            }
        }
        action = 'show';
    }
    if (state == 'show') {
        let move = path[0];
        path.splice(0, 1);
        if (path.length == 0) {
            greedyInProgress = false;
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