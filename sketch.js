const r = require("raylib");
const maze = require("./maze");

const getScreenSize = function ({ width, height }, { cellSize }) {
    return {
        width: (width + 2) * cellSize,
        height: (height + 2) * cellSize,
    };
};

function setup() {
    const world = {
        screen: {},
        grid: {
            width: 50,
            height: 50,
        },
        config: {
            cellSize: 20,
            visited: [],
            palette: {
                0: r.BLACK,
                1: r.WHITE,
            },
            path: [],
        },
    };

    world.screen = getScreenSize(world.grid, world.config);

    world.config.row = maze.getRandom(world.grid.height);
    world.config.col = 0;
    world.config.mazeGrid = maze.initializeMaze(world.grid);

    maze.generateMaze(world.config);
    maze.addMazeBorders(world.config);

    const startRow = maze.getHighIndices(world.config, 0)[0];
    const endRow = maze.getHighIndices(
        world.config,
        world.config.mazeGrid[0].length - 1,
    )[0];

    maze.solveMaze(world.config, startRow, 0, endRow);

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

    for (let y = 0; y < grid.height + 2; y++) {
        for (let x = 0; x < grid.width + 2; x++) {
            const posX = x * cellSize;
            const posY = y * cellSize;

            const color = palette[mazeGrid[y][x]];

            r.DrawRectangle(posX, posY, cellSize, cellSize, color);
        }
    }
}

const highlightPath = function (world) {
    const { cellSize } = world.config;

    for (const { x, y } of world.config.path) {
        const posX = x * cellSize;
        const posY = y * cellSize;

        r.DrawRectangle(posX, posY, cellSize, cellSize, r.RED);
    }
};

function draw(world) {
    r.BeginDrawing();

    drawMaze(world);
    highlightPath(world);

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
