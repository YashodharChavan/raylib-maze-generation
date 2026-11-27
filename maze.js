const initializeMaze = function (width, height) {
    const maze = [];

    for (let y = 0; y < height; y++) {
        const mazeRow = [];
        for (let x = 0; x < width; x++) {
            mazeRow.push(0);
        }
        maze.push(mazeRow);
    }

    return maze;
};

const getRandom = function (limit) {
    return Math.floor(Math.random() * limit);
};

const isCellWithinBounds = function (mazeGrid, row, col) {
    const mazeRow = mazeGrid.length;
    const mazeCol = mazeGrid[0].length;

    return row > 0 && col > 0 && row < mazeRow - 1 && col < mazeCol - 1;
};

const shuffle = function (array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = getRandom(i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
};

const carveMaze = function (mazeGrid, row, col, visited) {
    if (visited[row][col]) return;

    mazeGrid[row][col] = 1;
    visited[row][col] = 1;

    const directions = shuffle([
        { x: 0, y: -2 },
        { x: 0, y: 2 },
        { x: -2, y: 0 },
        { x: 2, y: 0 },
    ]);

    for (const { x, y } of directions) {
        const nextRow = row + y;
        const nextCol = col + x;

        if (!isCellWithinBounds(mazeGrid, nextRow, nextCol)) continue;
        if (visited[nextRow][nextCol]) continue;

        const wallRow = row + y / 2;
        const wallCol = col + x / 2;

        mazeGrid[wallRow][wallCol] = 1;

        carveMaze(mazeGrid, nextRow, nextCol, visited);
    }
};

const generateMaze = function ({ width, height }) {
    const mazeGrid = initializeMaze(width, height);
    const visited = initializeMaze(width, height);
    const startRow = 1;
    const startCol = 1;

    mazeGrid[startRow][startCol - 1] = 1;
    mazeGrid[height - 2][width - 1] = 1;

    carveMaze(mazeGrid, startRow, startCol, visited);

    return mazeGrid;
};

const solveMaze = function ({ mazeGrid }) {
    const startRow = 1;
    const endRow = mazeGrid.length - 2;
    const path = [];

    findMazePath(mazeGrid, path, startRow, 0, endRow);

    return path;
};

const getHighIndices = function (mazeGrid, col) {
    const indices = [];

    for (let row = 0; row < mazeGrid.length; row++) {
        if (mazeGrid[row][col]) indices.push(row);
    }

    return indices;
};

const isCellPresentInPath = function (path, nextRow, nextCol) {
    for (const { x, y } of path) {
        if (x === nextCol && y === nextRow) return true;
    }

    return false;
};

const findMazePath = function (mazeGrid, path, row, col, endRow) {
    if (
        row < 0 ||
        col < 0 ||
        row >= mazeGrid.length ||
        col >= mazeGrid[0].length
    ) {
        return false;
    }
    if (isCellPresentInPath(path, row, col)) return false;

    path.push({
        x: col,
        y: row,
    });

    if (row === endRow && col === mazeGrid[0].length - 1) return true;

    const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
    ];

    for (const direction of directions) {
        const nextRow = direction.y + row;
        const nextCol = direction.x + col;
        if (!mazeGrid[nextRow][nextCol]) continue;

        const next = findMazePath(mazeGrid, path, nextRow, nextCol, endRow);

        if (next) return true;
    }

    path.pop();
    return false;
};

module.exports = {
    initializeMaze,
    carveMaze,
    getRandom,
    solveMaze,
    getHighIndices,
    generateMaze,
};
