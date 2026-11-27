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

const getRandom = function (start, end) {
    return start + Math.floor(Math.random() * (end - start));
};

const isCellWithinBounds = function (mazeGrid, row, col) {
    const mazeRow = mazeGrid.length;
    const mazeCol = mazeGrid[0].length;

    return row > 0 && col > 0 && row < mazeRow - 1 && col < mazeCol - 1;
};

const shuffle = function (array) {
    const shuffled = [...array];

    for (let i = 0; i < shuffled.length; i++) {
        const j = getRandom(0, shuffled.length - i);

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
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

        const dx = x / 2;
        const dy = y / 2;

        mazeGrid[row + dy][col + dx] = 1;

        carveMaze(mazeGrid, nextRow, nextCol, visited);
    }
};

const generateMaze = function (width, height) {
    const mazeGrid = initializeMaze(width, height);
    const visited = initializeMaze(width, height);
    const startRow = 1;
    const startCol = 1;

    mazeGrid[startRow][startCol - 1] = 1;
    mazeGrid[height - 2][width - 1] = 1;

    carveMaze(mazeGrid, startRow, startCol, visited);

    return mazeGrid;
};

const main = function () {
    const mazeWidth = 25;
    const mazeHeight = 25;

    const mazeGrid = generateMaze(mazeWidth, mazeHeight);

    console.table(mazeGrid);
};

main();
