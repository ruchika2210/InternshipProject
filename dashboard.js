function submitCategoryData() {
    // Fetch data from the form
    const categoryData = {
        categories: []
    };
    console.log("submitted!!!");
    document.querySelectorAll('.data-table tbody tr').forEach(row => {
        const category = {
            name: row.querySelector('.category-name')?.value,
            weight: row.querySelector('.category-weight')?.value,
            direction: row.querySelector('.category-direction')?.value,
            evaluationType: row.querySelector('.category-evaluation-type')?.value
        };

        categoryData.categories.push(category);
    });

    // Add data to localStorage
    localStorage.setItem('categoryData', JSON.stringify(categoryData));
    console.log('Script executed!');
    alert("Category data submitted!");
}

function submitScenarioInput() {
    // Fetch data from the form
    const scenarioInputData = {
        scenarios: []
    };

    document.querySelectorAll('.data-table:nth-child(2) tbody tr').forEach(row => {
        const scenario = {
            name: row.querySelector('.scenario-name')?.value
        };

        scenarioInputData.scenarios.push(scenario);
    });

    // Add data to localStorage
    localStorage.setItem('scenarioInputData', JSON.stringify(scenarioInputData));

    alert("Scenario input submitted!");
}

function submitScenarioData() {
    // Fetch data from the form
    const scenarioData = {
        scenarios: []
    };

    document.querySelectorAll('.data-table:nth-child(3) tbody tr').forEach(row => {
        const scenario = {
            emissionsReduction: row.querySelector('.emissions-reduction')?.value,
            airQualityImpact: row.querySelector('.air-quality-impact')?.value,
            wildlifeDisturbance: row.querySelector('.wildlife-disturbance')?.value,
            incomeGeneration: row.querySelector('.income-generation')?.value,
            jobCreated: row.querySelector('.job-created')?.value
        };

        scenarioData.scenarios.push(scenario);
    });

    // Add data to localStorage
    localStorage.setItem('scenarioData', JSON.stringify(scenarioData));



    alert("Scenario data submitted!");
}


// dashboard.js

// Function to add a new row for a category
function addRow(tableId) {
    const table = document.getElementById(tableId);
    const newRow = table.insertRow(-1); // Insert at the last position

    // Add cells based on the table
    switch (tableId) {
        case "categoryTable":
            addCategoryCells(newRow);
            break;
        case "scenarioInputTable":
            addScenarioInputCells(newRow);
            break;
        case "scenarioDataTable":
            addScenarioDataCells(newRow);
            break;
        default:
            break;
    }

    // Add a delete button
    const deleteCell = newRow.insertCell(-1);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
        table.deleteRow(newRow.rowIndex);
    });
    deleteCell.appendChild(deleteButton);
}

// Function to add cells for the Category table
function addCategoryCells(row) {
    // Example cells, modify as per your needs
    const rowIndex = row.rowIndex;
    addCell(row, `Category${rowIndex}`);
    addCell(row, createInput("text", "category-name"));
    addCell(row, createInput("number", "category-weight", "0.01"));
    addCell(row, createSelect("category-direction", ["Positive", "Negative"]));
    addCell(row, createSelect("category-evaluation-type", ["Ordinal", "Linear", "Descriptive"]));
}

// Function to add cells for the Scenario Input table
function addScenarioInputCells(row) {
    // Example cells, modify as per your needs
    addCell(row, `Scenario${row.rowIndex}`);
    addCell(row, createInput("text", "scenario-name"));
}

// Function to add cells for the Scenario Data table
function addScenarioDataCells(row) {
    // Example cells, modify as per your needs
    addCell(row, `Scenario${row.rowIndex}`);
    addCell(row, createInput("number", "emissions-reduction", "1", "0"));
    addCell(row, createSelect("air-quality-impact", ["Low", "Medium", "High"]));
    addCell(row, createSelect("wildlife-disturbance", ["Low", "Medium", "High"]));
    addCell(row, createSelect("income-generation", ["Low", "Medium", "High"]));
    addCell(row, createInput("number", "job-created", "1", "0"));
}

// Function to add a cell with text content or an element
function addCell(row, content) {
    const cell = row.insertCell(-1);

    if (typeof content === "string") {
        cell.textContent = content;
    } else {
        cell.appendChild(content);
    }
}


// Function to create an input element
function createInput(type, className, step = "", value = "") {
    const input = document.createElement("input");
    input.type = type;
    input.className = className;
    input.step = step;

    if (type === "number") {
        input.value = value;
    }

    return input;
}


// Function to create a select element with options
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

// Event listeners for adding rows
document.getElementById("addCategoryButton").addEventListener("click", function () {
    addRow("categoryTable");
});

document.getElementById("addScenarioButton").addEventListener("click", function () {
    addRow("scenarioInputTable");
});

document.getElementById("addScenarioDataButton").addEventListener("click", function () {
    addRow("scenarioDataTable");
});
document.getElementById('submitCategoryButton').addEventListener('click', submitCategoryData);
document.getElementById('submitScenarioInputButton').addEventListener('click', submitScenarioInput);
document.getElementById('submitScenarioDataButton').addEventListener('click', submitScenarioData)




