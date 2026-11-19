const sketch = require("./sketch")

function loop(world) {
    while(sketch.isRunning()) {
        sketch.draw(world);
        sketch.update(world);
    }
}

function main() {
    const world = sketch.setup()
    loop(world);
    sketch.tearDown();
}

main();