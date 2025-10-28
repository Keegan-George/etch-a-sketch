let canDraw = false;

createGrid();
setupListeners();

/**
 * Create a square grid of size n x n, where n is the number of squares that make up 
 * one side of the grid. 
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
 * Remove the grid from the DOM.
 */
function deleteGrid() {
    columns = document.querySelectorAll(".column");
    columns.forEach(column => { column.remove() });
}

/**
* Prompts the user to enter a valid grid size between 1 and 100.
- Repeats the prompt until a valid input is provided.
- Upon receiving valid input, deletes the existing grid and creates a new one with the specified size.
 */
function resetGrid() {
    const min = 1;
    const max = 100;
    let size;
    
    do {
        size = +prompt("Enter the size of the new grid. Up to a maximum of 100.", 100);

        if (!size){
            return;    
        }
    }
    while (size < min || size > max);

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
 * 
 */
function getDarkeningRate(color) {
    current_color = color.match(/\d+/g);
    values = current_color.map(n => +n);
    max_value = Math.max(...values);
    return Math.ceil(max_value / 10);
}

/**
 * Return
 */
function darken(color, amount) {
    current_color = color.match(/\d+/g);
    darkened_color = current_color.map(n => +n - amount);
    let [r, g, b] = darkened_color;
    return `rgb(${r},${g},${b})`;
}

/**
 * Sets up the listeners for the grid. 
 */
function setupListeners() {
    const gridContainer = document.querySelector(".grid-container");

    gridContainer.addEventListener("mousedown", event => {
        canDraw = true;

        const backgroundColor = event.target.style.backgroundColor;

        if (backgroundColor) {
            current_color = event.target.style.backgroundColor;
            console.log(`current color: ${current_color}`);
            darken_rate = event.target.dataset.progressingDarkenStepSize;
            darkened_color = darken(current_color, darken_rate);
            console.log(`darken color: ${darkened_color}`);

            event.target.style.backgroundColor = darkened_color;
            console.log(`darken color: ${event.target.style.backgroundColor}`);
        }

        else {
            color = getRandomRGBColor();
            event.target.style.backgroundColor = color;
            event.target.dataset.progressingDarkenStepSize = getDarkeningRate(color);
        }
    });

    gridContainer.addEventListener("mouseup", () => {
        canDraw = false;
    });

    gridContainer.addEventListener("mouseover", event => {
        if (canDraw) {
            const backgroundColor = event.target.style.backgroundColor;

            if (backgroundColor) {
                current_color = event.target.style.backgroundColor;
                console.log(`current color: ${current_color}`);
                darken_rate = event.target.dataset.progressingDarkenStepSize;
                darkened_color = darken(current_color, darken_rate);
                console.log(`darken color: ${darkened_color}`);

                event.target.style.backgroundColor = darkened_color;
                console.log(`darken color: ${event.target.style.backgroundColor}`);
            }

            else {
                color = getRandomRGBColor();
                event.target.style.backgroundColor = color;
                event.target.dataset.progressingDarkenStepSize = getDarkeningRate(color);
            }
        }
    });
}

