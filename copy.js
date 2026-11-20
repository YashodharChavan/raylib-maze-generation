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

const getRandomDirection = function () {
    const directions = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
    ];

    const index = getRandom(directions.length);

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

const generateMaze = function (mazeGrid, row, col, visited) {
    const directions = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
    ];

    if (directions.length === 0) return;

    if (!isCellWithinBounds(mazeGrid, row, col)) return "out_of_bounds";
    if (isVisited(visited, row, col)) return "visited";
    if (isCellSurrounded(mazeGrid, row, col)) return "surrounded";

    mazeGrid[row][col] = 1;
    visited.push([row, col]);

    const index = getRandom(directions.length);
    const { x, y } = directions.splice(index, 1)[0];

    const result = generateMaze(mazeGrid, row + y, col + x, visited);

    if (
        result === "out_of_bounds" ||
        result === "visited" ||
        result === "surrounded"
    ) {
        const index = getRandom(directions.length);
        const { x, y } = directions.splice(index, 1)[0];

        generateMaze(mazeGrid, row + y, col + x, visited);
    }
};

const main = function () {
    const mazeWidth = 5;
    const mazeHeight = 5;

    const mazeGrid = initializeMaze(mazeWidth, mazeHeight);
    console.log(mazeGrid);
    const startCol = 0;
    const startRow = getRandom(mazeHeight);

    const visited = [];

    generateMaze(mazeGrid, startRow, startCol, visited);

    const [endRow, endCol] = visited.at(-1);

    console.log(endRow, endCol);
    console.table(mazeGrid);
};

main();
