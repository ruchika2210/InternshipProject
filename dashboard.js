// Function to retrieve data from local storage
function getStoredData(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}

// Function to render a bar chart
function renderBarChart(categoryData) {
    const ctx = document.getElementById('barChart').getContext('2d');

    // Check if there's an existing chart and destroy it
    if (window.myBarChart) {
        window.myBarChart.destroy();
    }

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
    window.myBarChart = new Chart(ctx, {
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


// Function to store data in local storage
function storeData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Function to handle the submission of category data
function submitCategoryData() {
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

        categoryData.categories.push(category);
    });

    // Store data in local storage
    storeData('categoryData', categoryData);

    // Render the charts
    renderBarChart(categoryData);
}

// Function to handle the submission of scenario data
function submitScenarioData() {
    const scenarioData = {
        scenarios: []
    };

    document.querySelectorAll('#scenarioData .data-table tbody tr').forEach(row => {
        const scenario = {
            emissionsReduction: row.querySelector('.emissions-reduction')?.value,
            airQualityImpact: row.querySelector('.air-quality-impact')?.value,
            wildlifeDisturbance: row.querySelector('.wildlife-disturbance')?.value,
            incomeGeneration: row.querySelector('.income-generation')?.value,
            jobCreated: row.querySelector('.job-created')?.value
        };

        scenarioData.scenarios.push(scenario);
    });

    // Store data in local storage
    storeData('scenarioData', scenarioData);

    // Render the charts
    renderPieChart(scenarioData);
}

// Attach event listeners to submit buttons
document.getElementById('submitCategoryButton').addEventListener('click', submitCategoryData);
document.getElementById('submitScenarioDataButton').addEventListener('click', submitScenarioData);

// Retrieve stored data and render charts on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedCategoryData = getStoredData('categoryData');
    const storedScenarioData = getStoredData('scenarioData');

    if (storedCategoryData) {
        renderBarChart(storedCategoryData);
    }

    if (storedScenarioData) {
        renderPieChart(storedScenarioData);
    }
});
