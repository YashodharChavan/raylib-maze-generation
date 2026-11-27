const r = require("raylib");
const maze = require("./maze");

const getScreenSize = function (config) {
    const { mazeGrid, cellSize } = config;
    const mazeWidth = mazeGrid[0].length;
    const mazeHeight = mazeGrid.length;

    return {
        width: mazeWidth * cellSize,
        height: mazeHeight * cellSize,
    };
};

function setup() {
    const world = {
        screen: {},
        grid: {
            width: 101,
            height: 101,
        },
        config: {
            cellSize: 10,
            palette: {
                0: r.BLACK,
                1: r.WHITE,
            },
        },
    };

    world.config.mazeGrid = maze.generateMaze(world.grid);
    world.config.path = maze.solveMaze(world.config);

    world.screen = getScreenSize(world.config);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.screen.width, world.screen.height, "MAZE GENERATION");
    r.SetTargetFPS(60);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function drawMaze(config) {
    const { cellSize, palette, mazeGrid } = config;
    const mazeWidth = mazeGrid[0].length;
    const mazeHeight = mazeGrid.length;

    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            const posX = x * cellSize;
            const posY = y * cellSize;
            const color = palette[mazeGrid[y][x]];

            r.DrawRectangle(posX, posY, cellSize, cellSize, color);
        }
    }
}

const highlightPath = function (config) {
    const { cellSize, path } = config;

    for (const { x, y } of path) {
        const posX = x * cellSize;
        const posY = y * cellSize;

        r.DrawRectangle(posX, posY, cellSize, cellSize, r.RED);
    }
};

function draw(world) {
    const { config } = world;
    r.BeginDrawing();

    drawMaze(config);
    highlightPath(config);

    r.EndDrawing();
}

function update(world) {}

function tearDown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    tearDown,
};
