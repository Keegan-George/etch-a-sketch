let canDraw = false;

function createGrid(size = 16) {
    const gridContainer = document.querySelector(".grid-container");

    for (let i = 0; i < size; i++) {
        column = document.createElement("div");
        column.classList.add("column");
        for (let j = 0; j < size; j++) {
            square = document.createElement("div");
            square.classList.add("square");
            column.appendChild(square);
            gridContainer.appendChild(column);
        }
    }
}

function deleteGrid() {
    columns = document.querySelectorAll(".column");
    columns.forEach(column => { column.remove() });
}

function resetGrid() {
    let size = +prompt("Enter the size of the new grid.");
    deleteGrid();
    createGrid(size);
}

function setupListeners(){
    const gridContainer = document.querySelector(".grid-container");

    gridContainer.addEventListener("mousedown", event => {
        canDraw = true;
    });

    gridContainer.addEventListener("mouseup", event => {
        canDraw = false;
    })

    gridContainer.addEventListener("mouseover", event => {
        if (canDraw){
            event.target.classList.add("enabled");
        }
        
    });
}

createGrid();
setupListeners();