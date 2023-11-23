// Array to store category details
const categoryDetails = [];

// Flag to track if the user has clicked the Commit button
let isCommitClicked = false;

// Function to add a category row
function addCategory() {
    const tableBody = document.querySelector('table#categoryDetails tbody');

    // Show the table if it's hidden
    if (tableBody.parentElement.style.display === "none") {
        tableBody.parentElement.style.display = "table";
    }

    // Create a new row
    const newRow = tableBody.insertRow(-1);

    // Add cells with input elements
    addCell(newRow, createInput("text", "category-name"));
    addCell(newRow, createInput("number", "category-weight", "0.01"));
    addCell(newRow, createSelect("category-direction", ["Positive", "Negative"]));
    addCell(newRow, createSelect("category-type", ["Ordinal", "Linear", "Descriptive"]));

    // Add a delete button
    const deleteCell = newRow.insertCell(-1);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
        tableBody.deleteRow(newRow.rowIndex);
        if (isCommitClicked) {
            updateCategoryDetailsArray(); // Update the array after deleting a row only if Commit is clicked
        }
    });
    deleteCell.appendChild(deleteButton);

    if (isCommitClicked) {
        updateCategoryDetailsArray(); // Update the array after adding a new row only if Commit is clicked
    }
}


// Function to update the category details array
function updateCategoryDetailsArray() {
    categoryDetails.length = 0; // Clear the array

    // Get all category rows
    const categoryRows = document.querySelectorAll('table#categoryDetails tbody tr');

    // Iterate through each category row
    categoryRows.forEach(row => {
        // Check if the input element in the first cell exists
        const nameInput = row.querySelector("input");
        if (nameInput) {
            const category = {
                name: nameInput.value,
                weight: row.cells[1].querySelector("input").value,
                direction: row.cells[2].querySelector("select").value,
                type: row.cells[3].querySelector("select").value,
            };

            // Calculate x by multiplying weight and direction
            category.x = category.weight * (category.direction === 'Positive' ? 1 : -1);

            categoryDetails.push(category);
        }
    });

    // Log the updated array
    console.log("Category details array after clicking Commit:", categoryDetails);

    // Log calculated x values
    console.log("Calculated x values:");
    categoryDetails.forEach(category => {
        console.log(`Category: ${category.name}, x: ${category.x}`);
    });
}



// Function to create an input element
function createInput(type, className, value = "") {
    const input = document.createElement("input");
    input.type = type;
    input.className = className;
    input.value = value;
    return input;
}

// Function to create a select element
function createSelect(className, options) {
    const select = document.createElement("select");
    select.className = className;

    options.forEach(optionValue => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        select.appendChild(option);
    });

    return select;
}

// Function to add a cell to a row
function addCell(row, content) {
    const cell = row.insertCell(-1);
    cell.appendChild(content);
}

function commitCategories() {
    isCommitClicked = true; // Set the flag to true when Commit is clicked
    updateCategoryDetailsArray(); // Update the array after Commit is clicked
    // ...
}



// // Function to commit category details (you can replace this with your actual commit logic)
// function commitCategories() {
//     isCommitClicked = true; // Set the flag to true when Commit is clicked
//     updateCategoryDetailsArray(); // Update the array after Commit is clicked
// }

