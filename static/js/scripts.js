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
        size = +prompt("Enter the size of the new grid. Up to a maximum of 100.");
    }
    while (size < 1 || size > 100);

    deleteGrid();
    createGrid(size);
}

/**
 * Sets up the listeners for the grid. 
 */
function setupListeners() {
    const gridContainer = document.querySelector(".grid-container");

    gridContainer.addEventListener("mousedown", event => {
        canDraw = true;
        event.target.classList.add("enabled");
    });

    gridContainer.addEventListener("mouseup", event => {
        canDraw = false;
    })

    gridContainer.addEventListener("mouseover", event => {
        if (canDraw) {
            event.target.classList.add("enabled");
        }

    });
}

createGrid();
setupListeners();