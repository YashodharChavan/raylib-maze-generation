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

const getRandomDirection = function () {
    const directions = [
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
    ];

    const index = getRandom(3);

    return directions[index];
};

const isCellWithinBounds = function (mazeGrid, row, col) {
    const mazeRow = mazeGrid.length;
    const mazeCol = mazeGrid[0].length;

    return row >= 0 && col >= 0 && row < mazeRow && col < mazeCol;
};

const isCellSurrounded = function (mazeGrid, row, col) {
    if (!isCellWithinBounds(mazeGrid, row, col)) return false;

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


const generateMaze = function (mazeGrid, row, col) {
    if (!isCellWithinBounds(mazeGrid, row, col)) return;

    mazeGrid[row][col] = 1;
    let { x, y } = getRandomDirection();

    while (isCellSurrounded(mazeGrid, row + y, col + x)) {
        const direction = getRandomDirection();
        x = direction.x;
        y = direction.y;
    }

    generateMaze(mazeGrid, row + y, col + x);
};

const main = function () {
    const mazeWidth = 5;
    const mazeHeight = 5;

    const mazeGrid = initializeMaze(mazeWidth, mazeHeight);
    const startCol = 0;
    const startRow = getRandom(mazeHeight);

    generateMaze(mazeGrid, startRow, startCol);

    console.table(mazeGrid);
};

main();
