let canDraw = false;

/**
 * Creates a grid of size n x n, where n is the length of one side of the grid. 
 */
function createGrid(n = 100) {
    const gridContainer = document.querySelector(".grid-container");

    for (let i = 0; i < n; i++) {
        column = document.createElement("div");
        column.classList.add("column");
        for (let j = 0; j < n; j++) {
            square = document.createElement("div");
            square.classList.add("square");
            column.appendChild(square);
            gridContainer.appendChild(column);
        }
    }
}

/**
 * Deletes the grid and removes it from the screen.
 */
function deleteGrid() {
    columns = document.querySelectorAll(".column");
    columns.forEach(column => { column.remove() });
}

/**
 * Prompts the user to enter the value of a new grid. 
 * Deletes the previous grid and creates a new grid as per the user input. 
 */
function resetGrid() {
    let size;

    do {
        size = +prompt("Enter the size of the new grid. Up to a maximum of 100.", 100);
    }
    while (size < 1 || size > 100);

    deleteGrid();
    createGrid(size);
}

/**
 * Returns a random integer in the range of 0 to max.
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


/**
 * Returns a randomly generated RGB color string.
 */
function getRandomRGBColor() {
    return `rgb(${getRandomInt(256)},${getRandomInt(256)},${getRandomInt(256)})`;
}

/**
 * Returns true if the element that triggered the event has a background Color
 */

function hasBackgroundColor(event) {
    return event.target.style.backgroundColor;
}

/**
 * Return
 */
function darken(color) {
    current_color = color.match(/\d+/g);
    let [r, g, b] = current_color;
    r = r * 0.9;
    g = g * 0.9;
    b = b * 0.9;

    darkened_color = `rgb(${r},${g},${b})`;
    return darkened_color;
}

/**
 * Sets up the listeners for the grid. 
 */
function setupListeners() {
    const gridContainer = document.querySelector(".grid-container");

    gridContainer.addEventListener("mousedown", event => {
        canDraw = true;

        if (hasBackgroundColor(event)) {
            current_color = event.target.style.backgroundColor;
            console.log(`current color: ${current_color}`);

            darkened_color = darken(current_color);

            event.target.style.backgroundColor = darkened_color;
            console.log(`darken color: ${event.target.style.backgroundColor}`);
        }

        else {
            event.target.style.backgroundColor = getRandomRGBColor();
        }
    });

    gridContainer.addEventListener("mouseup", () => {
        canDraw = false;
    });

    gridContainer.addEventListener("mouseover", event => {
        if (canDraw) {
            if (hasBackgroundColor(event)) {
                current_color = event.target.style.backgroundColor;
                console.log(`current color: ${current_color}`);

                darkened_color = darken(current_color);

                event.target.style.backgroundColor = darkened_color;
                console.log(`darken color: ${event.target.style.backgroundColor}`);
            }

            else {
                event.target.style.backgroundColor = getRandomRGBColor();
            }
        }
    });
}

createGrid();
setupListeners();