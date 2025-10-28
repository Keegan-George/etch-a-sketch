let canDraw = false;

createGrid();
initializeListeners();

/**
 * Create a square grid of size n x n, where n is the number of squares along one side.
 * 
 * @param {number} n - The number of squares per row and column. 
 */
function createGrid(n = 100) {
    const gridContainer = document.querySelector(".grid-container");

    for (let i = 0; i < n; i++) {
        const column = document.createElement("div");
        column.classList.add("column");
        for (let j = 0; j < n; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            column.appendChild(square);
        }
        gridContainer.appendChild(column);
    }
}

/**
 * Remove the grid from the DOM.
 */
function deleteGrid() {
    const columns = document.querySelectorAll(".column");
    columns.forEach(column => { column.remove() });
}

/**
* Prompts the user to enter a valid grid size between min and max.
- Repeats the prompt until a valid input is provided.
- Upon receiving valid input, deletes the existing grid and creates a new one with the specified size.
 */
function resetGrid() {
    const min = 1;
    const max = 100;
    let size;

    do {
        const input = prompt(`Enter the size of the new grid (${min} - ${max}):`, 100);

        if (input === null) { //cancelled
            return;
        }

        size = +input;
    }
    while (isNaN(size) || size < min || size > max);

    deleteGrid();
    createGrid(size);
}

/**
 * Returns a random integer in the range from 0 to max, inclusive.
 * 
 * @param {number} max - The maximum value (inclusive) for the random integer.
 * @returns {number} A random integer from 0 to max inclusive.
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

/**
 * Returns a randomly generated RGB color string in the format 'rgb(r,g,b)',
 * where r, g, and b are colors between 0 and 255 inclusive. 
 * 
 * @returns - An RGB color string in the format 'rgb(r, g, b)'.
 */
function getRandomRGBColor() {
    const r = getRandomInt(255);
    const g = getRandomInt(255);
    const b = getRandomInt(255);
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Returns an integer representing how much the background is darkened on each click,
 * based on the brightest RGB component of the input color.
 * 
 * @param {string} color - An RGB color string in the format 'rgb(r, g, b)'.
 * @returns {number} - The darkening rate (1–26).
 */
function getDarkeningRate(color) {
    const rgbValues = color.match(/\d+/g).map(n => +n);

    const maxValue = Math.max(...rgbValues);
    return Math.ceil(maxValue / 10);
}

/**
 * Returns an rgb color string reduced by the specified amount.
 * 
 *  @param {string} color - An RGB color string in the format 'rgb(r, g, b)'.
 *  @param {number} darkenRate - The amount by which each RGB component will be reduced.
 *  @returns {string} - A new RGB string with darkened values.
 */
function darken(color, darkenRate) {
    const rgbValues = color.match(/\d+/g).map(n => Math.max(0, +n - darkenRate));
    const [r, g, b] = rgbValues;
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Applies a color to a square on the grid.
 * If the square already has a background color, it will be darkened by a stored step size.
 * Otherwise, a random color is applied and the darkening step size is initialized.

 * @param {HTMLElement} square - The grid square that triggered the event.
 */
function applyColor(square) {
    const backgroundColor = square.style.backgroundColor;

    if (backgroundColor) {
        console.log(`current color: ${backgroundColor}`);

        const darkenRate = square.dataset.progressingDarkenStepSize;
        const darkenedColor = darken(backgroundColor, darkenRate);
        console.log(`darken color: ${darkenedColor}`);

        square.style.backgroundColor = darkenedColor;
        console.log(`darken color: ${square.style.backgroundColor}`);
    }

    else {
        const color = getRandomRGBColor();
        square.style.backgroundColor = color;
        square.dataset.progressingDarkenStepSize = getDarkeningRate(color);
    }
}

/**
 * Initializes the mouse listeners for the grid. 
 */
function initializeListeners() {
    const gridContainer = document.querySelector(".grid-container");

    gridContainer.addEventListener("mousedown", event => {
        canDraw = true;
        const square = event.target;
        applyColor(square);
    });

    gridContainer.addEventListener("mouseup", () => {
        canDraw = false;
    });

    gridContainer.addEventListener("mouseover", event => {
        if (canDraw) {
            const square = event.target;
            applyColor(square);
        }
    });
}

