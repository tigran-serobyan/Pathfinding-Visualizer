var swarmInProgress = false;
var mainDirection;
function swarm(state) {
    if (state == 'start') {
        if (Math.abs(sx - ex) > Math.abs(sy - ey)) {
            if (sx > ex) {
                mainDirection = 'left';
            } else {
                mainDirection = 'right';
            }
        } else {
            if (sy > ey) {
                mainDirection = 'top';
            } else {
                mainDirection = 'bottom';
            }
        }
        path = [];
        step = 1;
        clearMatrix();
        if (matrix[sy - 1][sx] == 0) { matrix[sy - 1][sx] = 'check'; }
        if (matrix[sy + 1][sx] == 0) { matrix[sy + 1][sx] = 'check'; }
        if (matrix[sy][sx - 1] == 0) { matrix[sy][sx - 1] = 'check'; }
        if (matrix[sy][sx + 1] == 0) { matrix[sy][sx + 1] = 'check'; }
        swarmInProgress = true;
        action = 'find';
    }
    if (state == 'find') {

        let deadend = true;
        for (let y in matrix) {
            for (let x in matrix) {
                if (matrix[y][x] == 'check') {
                    y = parseInt(y);
                    x = parseInt(x);
                    if (matrix[y - 1][x] == 0) { matrix[y - 1][x] = 'check_'; deadend = false; }
                    if (matrix[y + 1][x] == 0) { matrix[y + 1][x] = 'check_'; deadend = false; }
                    if (matrix[y][x - 1] == 0) { matrix[y][x - 1] = 'check_'; deadend = false; }
                    if (matrix[y][x + 1] == 0) { matrix[y][x + 1] = 'check_'; deadend = false; }
                    if (mainDirection == 'left') {
                        if (matrix[y]) {
                            if (matrix[y][x - 2] == 0 && matrix[y][x - 1] == 'check_') { matrix[y][x - 2] = 'check_'; deadend = false; }
                        }
                    }
                    if (mainDirection == 'right') {
                        if (matrix[y]) {
                            if (matrix[y][x + 2] == 0 && matrix[y][x + 1] == 'check_') { matrix[y][x + 2] = 'check_'; deadend = false; }
                        }
                    }
                    if (mainDirection == 'top') {
                        if (matrix[y - 2]) {
                            if (matrix[y - 2][x] == 0 && matrix[y - 1][x] == 'check_') { matrix[y - 2][x] = 'check_'; deadend = false; }
                        }
                    }
                    if (mainDirection == 'bottom') {
                        if (matrix[y + 2]) {
                            if (matrix[y + 2][x] == 0 && matrix[y + 1][x] == 'check_') { matrix[y + 2][x] = 'check_'; deadend = false; }
                        }
                    }
                    if (matrix[y - 1][x] == 'end') { action = 'found'; return true; }
                    if (matrix[y + 1][x] == 'end') { action = 'found'; return true; }
                    if (matrix[y][x - 1] == 'end') { action = 'found'; return true; }
                    if (matrix[y][x + 1] == 'end') { action = 'found'; return true; }
                }
            }
        }
        for (let y in matrix) {
            for (let x in matrix) {
                if (matrix[y][x] == 'check_') {
                    matrix[y][x] = 'check';
                }
            }
        }
        if (deadend) {
            swarmInProgress = false;
            action = '';
            return false;
        }
    }
    if (state == 'found') {
        let inProgress = true;
        while (inProgress) {
            if (step == 1) {
                if (matrix[sy - 1][sx] == 'check') { matrix[sy - 1][sx] = step }
                if (matrix[sy + 1][sx] == 'check') { matrix[sy + 1][sx] = step }
                if (matrix[sy][sx - 1] == 'check') { matrix[sy][sx - 1] = step }
                if (matrix[sy][sx + 1] == 'check') { matrix[sy][sx + 1] = step }
                if (matrix[sy - 1][sx] == 'end') { inProgress = false; }
                if (matrix[sy + 1][sx] == 'end') { inProgress = false; }
                if (matrix[sy][sx - 1] == 'end') { inProgress = false; }
                if (matrix[sy][sx + 1] == 'end') { inProgress = false; }
            } else {
                let deadend = true;
                for (let y in matrix) {
                    for (let x in matrix) {
                        if (matrix[y][x] == step - 1) {
                            y = parseInt(y);
                            x = parseInt(x);
                            if (matrix[y - 1][x] == 'check') { matrix[y - 1][x] = step; deadend = false; }
                            if (matrix[y + 1][x] == 'check') { matrix[y + 1][x] = step; deadend = false; }
                            if (matrix[y][x - 1] == 'check') { matrix[y][x - 1] = step; deadend = false; }
                            if (matrix[y][x + 1] == 'check') { matrix[y][x + 1] = step; deadend = false; }
                            if (matrix[y - 1][x] == 'end') { inProgress = false; }
                            if (matrix[y + 1][x] == 'end') { inProgress = false; }
                            if (matrix[y][x - 1] == 'end') { inProgress = false; }
                            if (matrix[y][x + 1] == 'end') { inProgress = false; }
                        }
                    }
                }
                if (deadend) {
                    inProgress = false;
                }
            }
            step++;
        }
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
        if (path.length == 1) {
            swarmInProgress = false;
            action = '';
            for (let y in matrix) {
                for (let x in matrix) {
                    if (typeof matrix[y][x] == 'number') {
                        matrix[y][x] = 0;
                    }
                    if (matrix[y][x] == 'check' || matrix[y][x] == 'check_') {
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