// Function to render a bar chart
function renderBarChart(categoryData) {
    const ctx = document.getElementById('barChart').getContext('2d');

    // Extract data for the chart
    const labels = categoryData.categories.map(category => category.name);
    const weights = categoryData.categories.map(category => category.weight);

    // Bar chart data
    const data = {
        labels: labels,
        datasets: [{
            label: 'Category Weights',
            data: weights,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Bar chart options
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Create the bar chart
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

// Function to render a pie chart
function renderPieChart(scenarioData) {
    const ctx = document.getElementById('pieChart').getContext('2d');

    // Extract data for the chart
    const labels = scenarioData.scenarios.map(scenario => scenario.emissionsReduction);
    const dataValues = scenarioData.scenarios.map(scenario => scenario.jobCreated);

    // Pie chart data
    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    };

    // Pie chart options
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Create the pie chart
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}

// Retrieve data from Category Input Table
const categoryData = {
    categories: []
};

document.querySelectorAll('#categoryInput .data-table tbody tr').forEach(row => {
    const category = {
        name: row.querySelector('.category-name')?.value,
        weight: row.querySelector('.category-weight')?.value,
        direction: row.querySelector('.category-direction')?.value,
        evaluationType: row.querySelector('.category-evaluation-type')?.value
    };
    console.log(category);  // Add this line

    categoryData.categories.push(category);
});

console.log(categoryData);  // Add this line


// Retrieve data from Scenario Input Table
const scenarioInputData = {
    scenarios: []
};

document.querySelectorAll('#scenarioInput .data-table tbody tr').forEach(row => {
    const scenario = {
        name: row.querySelector('.scenario-name')?.value
    };

    console.log(scenario);  // Add this line

    scenarioInputData.scenarios.push(scenario);
});

console.log(scenarioInputData);  // Add this line

// Retrieve data from Scenario Data Table
const scenarioData = {
    scenarios: []
};

document.querySelectorAll('#scenarioData .data-table tbody tr').forEach(row => {
    const emissionsReduction = row.querySelector('.emissions-reduction')?.value;
    const airQualityImpact = row.querySelector('.air-quality-impact')?.value;
    const wildlifeDisturbance = row.querySelector('.wildlife-disturbance')?.value;
    const incomeGeneration = row.querySelector('.income-generation')?.value;
    const jobCreated = row.querySelector('.job-created')?.value;

    // Check if all values are present before adding to scenarios
    if (emissionsReduction && airQualityImpact && wildlifeDisturbance && incomeGeneration && jobCreated) {
        const scenario = {
            emissionsReduction,
            airQualityImpact,
            wildlifeDisturbance,
            incomeGeneration,
            jobCreated
        };
        console.log(scenario);  // Add this line

        scenarioData.scenarios.push(scenario);
    }
});

console.log(scenarioData);  // Add this line

// Store data in localStorage
localStorage.setItem('categoryData', JSON.stringify(categoryData));
localStorage.setItem('scenarioInputData', JSON.stringify(scenarioInputData));
localStorage.setItem('scenarioData', JSON.stringify(scenarioData));


console.log(categoryData);
console.log(scenarioData);


document.addEventListener('DOMContentLoaded', function () {
    renderBarChart(categoryData);
    renderPieChart(scenarioData);
});

//Form submitted and stored in local storage
function submitCategoryData() {
    const categoryData = {
        categories: []
    };

    document.querySelectorAll('.data-table tbody tr').forEach(row => {
        const category = {
            name: row.querySelector('.category-name')?.value,
            weight: row.querySelector('.category-weight')?.value,
            direction: row.querySelector('.category-direction')?.value,
            evaluationType: row.querySelector('.category-evaluation-type')?.value
        };

        categoryData.categories.push(category);
    });

    localStorage.setItem('categoryData', JSON.stringify(categoryData));
    alert("Category data submitted!");
}

function submitScenarioInput() {
    const scenarioInputData = {
        scenarios: []
    };

    document.querySelectorAll('.data-table tbody tr').forEach(row => {
        const scenario = {
            name: row.querySelector('.scenario-name')?.value
        };

        // console.log(scenario);

        scenarioInputData.scenarios.push(scenario);
    });

    localStorage.setItem('scenarioInputData', JSON.stringify(scenarioInputData));
    alert("Scenario input submitted!");
}

function submitScenarioData() {
    const scenarioData = {
        scenarios: []
    };

    document.querySelectorAll('.data-table tbody tr').forEach(row => {
        const scenario = {
            emissionsReduction: row.querySelector('.emissions-reduction')?.value,
            airQualityImpact: row.querySelector('.air-quality-impact')?.value,
            wildlifeDisturbance: row.querySelector('.wildlife-disturbance')?.value,
            incomeGeneration: row.querySelector('.income-generation')?.value,
            jobCreated: row.querySelector('.job-created')?.value
        };

        // console.log(scenario);

        scenarioData.scenarios.push(scenario);
    });

    localStorage.setItem('scenarioData', JSON.stringify(scenarioData));
    alert("Scenario data submitted!");
}

document.getElementById('submitCategoryButton').addEventListener('click', submitCategoryData);
document.getElementById('submitScenarioInputButton').addEventListener('click', submitScenarioInput);
document.getElementById('submitScenarioDataButton').addEventListener('click', submitScenarioData);
