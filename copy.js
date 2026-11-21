const visited = [];

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

const isVisited = function (visited, row, col) {
    for (const [visitedRow, visitedCol] of visited) {
        if (visitedRow === row && visitedCol === col) return true;
    }
    return false;
};

const generateMaze = function (mazeGrid, row, col, visited) {
    if (!isCellWithinBounds(mazeGrid, row, col)) return;
    if (isVisited(visited, row, col)) return;
    if (isCellSurrounded(mazeGrid, row, col)) return;

    const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
    ];

    mazeGrid[row][col] = 1;
    visited.push([row, col]);

    while (directions.length > 0) {
        const index = getRandom(directions.length);
        const { x, y } = directions.splice(index, 1)[0];

        generateMaze(mazeGrid, row + y, col + x, visited);
    }
};

const getHighIndices = function (mazeGrid, col) {
    const indices = [];

    for (let row = 0; row < mazeGrid.length; row++) {
        if (mazeGrid[row][col]) indices.push(row);
    }

    return indices;
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

const isCellPresentInPath = function (path, nextRow, nextCol) {
    for (const { x, y } of path) {
        if (x === nextCol && y === nextRow) return true;
    }

    return false;
};

const solveMaze = function (mazeGrid, row, col, path, endRow) {
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

        const next = solveMaze(mazeGrid, nextRow, nextCol, path, endRow);

        if (next) return true;
    }

    path.pop();
    return false;
};

const main = function () {
    const mazeWidth = 5;
    const mazeHeight = 5;

    const mazeGrid = initializeMaze(mazeWidth, mazeHeight);
    const startCol = 0;
    const startRow = getRandom(mazeHeight);

    const visited = [];

    generateMaze(mazeGrid, startRow, startCol, visited);
    addMazeBorders(mazeGrid);

    const path = [];

    const solveStartRow = getHighIndices(mazeGrid, 0)[0];
    const correctEndRow = getHighIndices(mazeGrid, mazeGrid[0].length - 1)[0];
    const x = solveMaze(mazeGrid, solveStartRow, 0, path, correctEndRow);

    console.log(x);
    console.log(path)

    console.table(mazeGrid);
};

main();
