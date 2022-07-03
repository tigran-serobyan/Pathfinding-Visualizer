var dijkstraInProgress = false;
function dijkstra(state) {
    if (state == 'start') {
        path = [];
        step = 1;
        dijkstraInProgress = true;
        action = 'find';
        clearMatrix();
    }
    if (state == 'find') {
        if (step == 1) {
            if (matrix[sy - 1][sx] == 0) { matrix[sy - 1][sx] = step }
            if (matrix[sy + 1][sx] == 0) { matrix[sy + 1][sx] = step }
            if (matrix[sy][sx - 1] == 0) { matrix[sy][sx - 1] = step }
            if (matrix[sy][sx + 1] == 0) { matrix[sy][sx + 1] = step }
            if (matrix[sy - 1][sx] == 'end') { action = 'found'; return true; }
            if (matrix[sy + 1][sx] == 'end') { action = 'found'; return true; }
            if (matrix[sy][sx - 1] == 'end') { action = 'found'; return true; }
            if (matrix[sy][sx + 1] == 'end') { action = 'found'; return true; }
        } else {
            let deadend = true;
            for (let y in matrix) {
                for (let x in matrix) {
                    if (matrix[y][x] == step - 1) {
                        y = parseInt(y);
                        x = parseInt(x);
                        if (matrix[y - 1][x] == 0) { matrix[y - 1][x] = step; deadend = false; }
                        if (matrix[y + 1][x] == 0) { matrix[y + 1][x] = step; deadend = false; }
                        if (matrix[y][x - 1] == 0) { matrix[y][x - 1] = step; deadend = false; }
                        if (matrix[y][x + 1] == 0) { matrix[y][x + 1] = step; deadend = false; }
                        if (matrix[y - 1][x] == 'end') { action = 'found'; return true; }
                        if (matrix[y + 1][x] == 'end') { action = 'found'; return true; }
                        if (matrix[y][x - 1] == 'end') { action = 'found'; return true; }
                        if (matrix[y][x + 1] == 'end') { action = 'found'; return true; }
                    }
                }
            }
            if (deadend) {
                dijkstraInProgress = false;
                action = '';
                return false;
            }
        }
        step++;
    }
    if (state == 'found') {
        let x_ = ex, y_ = ey;
        while (step > 0) {
            y = y_;
            x = x_;
            if (matrix[y][x - 1] == step) { x_ = x - 1; y_ = y; }
            if (matrix[y][x + 1] == step) { x_ = x + 1; y_ = y; }
            if (matrix[y - 1][x] == step) { x_ = x; y_ = y - 1; }
            if (matrix[y + 1][x] == step) { x_ = x; y_ = y + 1; }
            step--;
            path.unshift({ x: x_, y: y_ });
        }
        action = 'show';
        return true;
    }
    if (state == 'show') {
        let move = path[0];
        path.splice(0, 1);
        if (path.length == 0) {
            dijkstraInProgress = false;
            action = '';
            for (let y in matrix) {
                for (let x in matrix) {
                    if (typeof matrix[y][x] == 'number') {
                        matrix[y][x] = 0;
                    }
                }
            }
        } else {
            return move;
        }
    }
    return false;
}