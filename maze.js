const initializeMaze = function ({ width, height }) {
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

    return row >= 0 && col >= 0 && row < mazeRow && col < mazeCol;
};

const isCellSurrounded = function (mazeGrid, row, col) {
    const upRow = Math.max(0, row - 1);
    const downRow = Math.min(mazeGrid.length - 1, row + 1);
    const leftCol = Math.max(0, col - 1);
    const rightCol = Math.min(mazeGrid[0].length - 1, col + 1);

    const totalNeighbors =
        (mazeGrid[upRow]?.[col] ?? 0) +
        (mazeGrid[downRow]?.[col] ?? 0) +
        (mazeGrid[row]?.[leftCol] ?? 0) +
        (mazeGrid[row]?.[rightCol] ?? 0);

    return totalNeighbors >= 2;
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
    const directions = shuffle([
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
    ]);

    mazeGrid[row][col] = 1;
    visited[row][col] = 1;


    for (const { x, y } of directions) {
        const nextRow = row + y;
        const nextCol = col + x;

        if (!isCellWithinBounds(mazeGrid, nextRow, nextCol)) continue;
        if (visited[nextRow][nextCol]) continue;
        if (isCellSurrounded(mazeGrid, nextRow, nextCol)) continue;

        carveMaze(mazeGrid, row + y, col + x, visited);
    }
};
const addMazeBorders = function (mazeGrid) {
    const startIndices = getHighIndices(mazeGrid, 0);
    const endIndices = getHighIndices(mazeGrid, mazeGrid[0].length - 1);

    const startIndex = getRandom(startIndices.length);
    const endIndex = getRandom(endIndices.length);

    const startRow = startIndices[startIndex];
    const endRow = endIndices[endIndex];

    for (let row = 0; row < mazeGrid.length; row++) {
        if (row !== startRow) mazeGrid[row].unshift(0);
        else mazeGrid[row].unshift(1);
        if (row !== endRow) mazeGrid[row].push(0);
        else mazeGrid[row].push(1);
    }

    const length = mazeGrid[0].length;

    mazeGrid.unshift(new Array(length).fill(0));
    mazeGrid.push(new Array(length).fill(0));
};

const generateMaze = function ({ width, height }) {
    const mazeGrid = initializeMaze({ width, height });

    const visited = initializeMaze({ width, height });
    const startRow = getRandom(height);
    const startCol = 0;

    carveMaze(mazeGrid, startRow, startCol, visited);
    addMazeBorders(mazeGrid);

    return mazeGrid;
};

const solveMaze = function ({ mazeGrid }) {
    const startRow = getHighIndices(mazeGrid, 0)[0];
    const endRow = getHighIndices(mazeGrid, mazeGrid[0].length - 1)[0];

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
    if (!isCellWithinBounds(mazeGrid, row, col)) return false;
    if (!mazeGrid[row][col]) return false;
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
    addMazeBorders,
    solveMaze,
    getHighIndices,
    generateMaze,
};
