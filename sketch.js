const r = require("raylib");
const maze = require("./maze");

const getScreenSize = function ({ width, height }, { cellSize }) {
    return {
        width: width * cellSize,
        height: height * cellSize,
    };
};

function setup() {
    const world = {
        screen: {},
        grid: {
            width: 20,
            height: 20,
        },
        config: {
            cellSize: 20,
            visited: [],
            palette: {
                0: r.BLACK,
                1: r.WHITE,
            },
        },
    };

    world.screen = getScreenSize(world.grid, world.config);

    world.config.row = maze.getRandom(world.grid.height);
    world.config.col = 0;

    world.config.mazeGrid = maze.initializeMaze(world.grid);
    maze.generateMaze(world.config);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.screen.width, world.screen.height, "MAZE GENERATION");
    r.SetTargetFPS(60);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function drawMaze(world) {
    const { grid } = world;
    const { cellSize, palette, mazeGrid } = world.config;

    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            const posX = x * cellSize;
            const posY = y * cellSize;

            const color = palette[mazeGrid[y][x]];

            r.DrawRectangle(posX, posY, cellSize, cellSize, color);
        }
    }
}

function draw(world) {
    r.BeginDrawing();

    drawMaze(world);

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
