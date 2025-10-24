function createGrid(size = 16) {
    const gridContainer = document.querySelector(".grid-container");

    gridContainer.addEventListener("mouseover", event => {
        event.target.classList.add("enabled");
    });

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

createGrid();