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

        //console.log(scenario);

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
        
        console.log(scenario);

        scenarioData.scenarios.push(scenario);
    });

    localStorage.setItem('scenarioData', JSON.stringify(scenarioData));
    alert("Scenario data submitted!");
}


document.getElementById('submitCategoryButton').addEventListener('click', submitCategoryData);
document.getElementById('submitScenarioInputButton').addEventListener('click', submitScenarioInput);
document.getElementById('submitScenarioDataButton').addEventListener('click', submitScenarioData);
