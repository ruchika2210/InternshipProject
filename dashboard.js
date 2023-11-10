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
            name: row.querySelector('.scenario-name').value
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


document.getElementById('submitCategoryButton').addEventListener('click', submitCategoryData);
document.getElementById('submitScenarioInputButton').addEventListener('click', submitScenarioInput);
document.getElementById('submitScenarioDataButton').addEventListener('click', submitScenarioData);




