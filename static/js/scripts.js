let canDraw = false;

/**
 * Creates a grid of size n x n, where n is the argument passed to the function. 
 */
function createGrid(n = 16) {
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
 * Deletes the grid from the screen
 */

function deleteGrid() {
    columns = document.querySelectorAll(".column");
    columns.forEach(column => { column.remove() });
}

/**
 * Prompts the user to enter the value of a new grid. 
 * Deletes the previous grid and creates a new one
 */
function resetGrid() {
    let size = +prompt("Enter the size of the new grid.");
    deleteGrid();
    createGrid(size);
}

/**
 * Sets up the listeners for the grids. 
 */
function setupListeners() {
    const gridContainer = document.querySelector(".grid-container");

    gridContainer.addEventListener("mousedown", event => {
        canDraw = true;
    });

    gridContainer.addEventListener("mouseup", event => {
        canDraw = false;
    })

    gridContainer.addEventListener("mouseover", event => {
        if (canDraw) {
            event.target.classList.add("enabled");
            console.log(event.button)
        }

    });
}

createGrid();
setupListeners();