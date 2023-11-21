/**
 * Submits category data.
 * @function
 * @name submitCategoryData
 * @description Fetches data from the form and stores it in localStorage.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 */
function submitCategoryData() {
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

/**
 * Submits scenario input data.
 * @function
 * @name submitScenarioInput
 * @description Fetches data from the form and stores it in localStorage.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 */
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

/**
 * Submits scenario data.
 * @function
 * @name submitScenarioData
 * @description Fetches data from the form and stores it in localStorage.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 */
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

/**
 * Adds a new row for a category.
 * @function
 * @name addRow
 * @description Adds a new row to the specified table and populates cells based on the table type.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 * @param {string} tableId - The ID of the table to which the row will be added.
 */
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

/**
 * Adds cells for the Category table.
 * @function
 * @name addCategoryCells
 * @description Adds cells to a Category table row.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 * @param {HTMLTableRowElement} row - The table row to which cells will be added.
 */
function addCategoryCells(row) {
    // Example cells, modify as per your needs
    const rowIndex = row.rowIndex;
    addCell(row, `Category${rowIndex}`);
    addCell(row, createInput("text", "category-name"));
    addCell(row, createInput("number", "category-weight", "0.01"));
    addCell(row, createSelect("category-direction", ["Positive", "Negative"]));
    addCell(row, createSelect("category-evaluation-type", ["Ordinal", "Linear", "Descriptive"]));
}

/**
 * Adds cells for the Scenario Input table.
 * @function
 * @name addScenarioInputCells
 * @description Adds cells to a Scenario Input table row.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 * @param {HTMLTableRowElement} row - The table row to which cells will be added.
 */
function addScenarioInputCells(row) {
    // Example cells, modify as per your needs
    addCell(row, `Scenario${row.rowIndex}`);
    addCell(row, createInput("text", "scenario-name"));
}

/**
 * Adds cells for the Scenario Data table.
 * @function
 * @name addScenarioDataCells
 * @description Adds cells to a Scenario Data table row.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 * @param {HTMLTableRowElement} row - The table row to which cells will be added.
 */
function addScenarioDataCells(row) {
    // Example cells, modify as per your needs
    addCell(row, `Scenario${row.rowIndex}`);
    addCell(row, createInput("number", "emissions-reduction", "1", "0"));
    addCell(row, createSelect("air-quality-impact", ["Low", "Medium", "High"]));
    addCell(row, createSelect("wildlife-disturbance", ["Low", "Medium", "High"]));
    addCell(row, createSelect("income-generation", ["Low", "Medium", "High"]));
    addCell(row, createInput("number", "job-created", "1", "0"));
}

/**
 * Adds a cell with text content or an element.
 * @function
 * @name addCell
 * @description Adds a cell to a table row with either text content or an element.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 * @param {HTMLTableRowElement} row - The table row to which cells will be added.
 * @param {string|HTMLElement} content - The content of the cell. It can be either a string or an HTML element.
 */
function addCell(row, content) {
    const cell = row.insertCell(-1);

    if (typeof content === "string") {
        cell.textContent = content;
    } else {
        cell.appendChild(content);
    }
}

/**
 * Creates an input element.
 * @function
 * @name createInput
 * @description Creates an input element with specified attributes.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 * @param {string} type - The type of the input element (e.g., "text", "number").
 * @param {string} className - The class name of the input element.
 * @param {string} step - The step attribute for number inputs.
 * @param {string} value - The default value for the input element.
 * @returns {HTMLInputElement} The created input element.
 */
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

/**
 * Creates a select element with options.
 * @function
 * @name createSelect
 * @description Creates a select element with specified options.
 * @author Utsav Krishnatra
 * @date 11/20/2023 - 6:31:43 PM
 * @param {string} className - The class name of the select element.
 * @param {string[]} options - The array of options for the select element.
 * @returns {HTMLSelectElement} The created select element.
 */
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
document.getElementById('submitScenarioDataButton').addEventListener('click', submitScenarioData);


// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
    // Call functions to create charts
    createBarChart();
    createPieChart();
});

function createBarChart() {
    // Extract data for the bar chart
    const scenarioNames = ["Scenario1", "Scenario2", "Scenario3"]; // Replace with actual scenario names
    const totalDimensionlessScores = [0.8, 0.6, 0.7]; // Replace with actual totalDimensionlessScores

    // Create Bar Chart
    const barChartCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: scenarioNames,
            datasets: [{
                label: 'Total Dimensionless Score',
                data: totalDimensionlessScores,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function createPieChart() {
    // Extract data for the pie chart
    const categoryNames = ["Category1", "Category2", "Category3"]; // Replace with actual category names
    const weights = [0.2, 0.3, 0.5]; // Replace with actual weights

    // Create Pie Chart
    const pieChartCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieChartCtx, {
        type: 'pie',
        data: {
            labels: categoryNames,
            datasets: [{
                data: weights,
                backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            }],
        },
    });
}

