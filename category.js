// Counter to track the number of added categories
let categoryCounter = 0;

// Function to add a new row to the Category Details Table
function addCategory() {
    // Increment the category counter
    categoryCounter++;

    // Get the Category Details Table
    const categoryTable = document.getElementById("categoryDetails");

    // Make the table visible if it was hidden
    if (categoryTable.style.display === "none") {
        categoryTable.style.display = "table";
    }

    // Create a new row
    const newRow = categoryTable.insertRow();

    // Create cells for each column
    const nameCell = newRow.insertCell(0);
    const weightCell = newRow.insertCell(1);
    const directionCell = newRow.insertCell(2);
    const typeCell = newRow.insertCell(3);
    const actionCell = newRow.insertCell(4);

    // Set the content of each cell
    nameCell.innerHTML = `<input type="text" id="categoryName${categoryCounter}" />`;
    weightCell.innerHTML = `<input type="number" step="0.01" id="categoryWeight${categoryCounter}" />`;
    directionCell.innerHTML = `<select id="categoryDirection${categoryCounter}">
                                <option value="Positive">Positive</option>
                                <option value="Negative">Negative</option>
                            </select>`;
    typeCell.innerHTML = `<select id="categoryType${categoryCounter}">
                            <option value="Linear">Linear</option>
                            <option value="Ordinal">Ordinal</option>
                            <option value="Descriptive">Descriptive</option>
                        </select>`;
    actionCell.innerHTML = `<button class="delete-button" onclick="deleteCategory(${categoryCounter})">Delete</button>`;
}

// Function to handle Commit button click
function commitCategories() {
    // Add any logic you need for committing categories

    // Redirect to dashboard.html
    window.location.href = "dashboard.html";
}

// Function to delete a category row
function deleteCategory(rowNumber) {
    const categoryTable = document.getElementById("categoryDetails");
    categoryTable.deleteRow(rowNumber);
}
