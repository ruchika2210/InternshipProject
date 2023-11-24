import { db } from '../Auth/auth.js';
import { getFirestore, collection, addDoc,getDocs } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';


async function submitScenarioInput() {
    // Fetch data from the form
    try {
        const scenarioInputData = {
            scenarios: []
        };

        const rows = document.querySelectorAll('.data-table tbody');
        if (rows.length === 0) {
            console.error("No rows found in the table.");
            return;
        } else {
            const scenario = {
                name: document.querySelector('.scenario-name')?.value
            };
            scenarioInputData.scenarios.push(scenario);

            // Add data to localStorage
            localStorage.setItem('scenarioInputData', JSON.stringify(scenarioInputData));
            const jsonData = JSON.stringify(scenarioInputData);

            // Add data to firestore (assuming db has the appropriate methods)
            const docRef = await addDoc(collection(db, 'Scenario'), {
                scenarios: scenarioInputData.scenarios
            });

            console.log("Document written with ID: ", docRef.id);
-
            alert("Scenario input submitted!");
            // Include the docRef.id in the URL when redirecting to category.html
            window.location.href = `category.html?docId=${docRef.id}`;

        }

        
    } catch (error) {
        console.log(error);
    }
}


function addRow(tableId) {
    const table = document.getElementById(tableId);
    const newRow = table.querySelector('tbody').insertRow(-1);
    if(newRow.rowIndex>=1)
    {
        let addScenariobtn= document.getElementById('addScenarioButton');
        addScenariobtn.disabled=true;
    }
    // Add cells into  the table
    
     addScenarioInputCells(newRow);
            
    // Add a delete button
    const deleteCell = newRow.insertCell(-1);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button submit-button";
    deleteButton.addEventListener("click", function () {
        let addScenariobtn= document.getElementById('addScenarioButton');
        addScenariobtn.removeAttribute("disabled");
        table.deleteRow(newRow.rowIndex);
        
    });
    deleteCell.appendChild(deleteButton);
}



function addScenarioInputCells(row) {
    // Example cells, modify as per your needs
    //addCell(row, `Scenario${row.rowIndex}`);
    //addCell(row, `Scenario${row.rowIndex}`);
    addCell(row, `Scenario`);
    addCell(row, createInput("text", "scenario-name"));
}



function addCell(row, content) {
    const cell = row.insertCell(-1);

    if (typeof content === "string") {
        cell.textContent = content;
    } else {
        cell.appendChild(content);
    }
}

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



document.getElementById("addScenarioButton").addEventListener("click", function () {
    addRow("scenarioInputTable");
});


document.getElementById('submitScenarioInputButton').addEventListener('click', submitScenarioInput);


function hideContent(dropdownId) {
   

    // Show the selected dropdown
    const selectedDropdown = document.querySelector(`.${dropdownId}`);
    if (selectedDropdown.style.display == 'block') {
        selectedDropdown.style.display = 'none';
    }else{
        selectedDropdown.style.display = 'block';
    }
}


function addClass(object,className)
{
    const selectedObjs=document.querySelectorAll(object);

    selectedObjs.forEach((cobj,cidx,oarr)=>{
          cobj.classList.add(className)
    })
}


function addUniqueIdToClass(className) {
    const elements = document.querySelectorAll('.' + className);
    
    elements.forEach((element, index) => {
        const uniqueId = className + '-' + index;
        element.setAttribute('id', uniqueId);
    });
}


let isLocked = false;

function toggleLock() {
    // Toggle the lock state
    isLocked = !isLocked;

    // Update the lock button text
    const lockButton = document.getElementById('lk1');
    lockButton.textContent = isLocked ? 'Unlock' : 'Lock';

    // Disable or enable scenario creation logic based on the lock state
    const btn1 = document.getElementById('addScenarioButton');
    const btn2 = document.getElementById('submitScenarioInputButton');


    if (isLocked) {
        // If locked, disable scenario creation
        btn1.disabled = true;
        btn2.disabled = true;
    } else {
        // If unlocked, enable scenario creation
        btn1.disabled = false;
        btn2.disabled = false;
    }
}

document.getElementById('lk1').addEventListener('click', toggleLock);



//-----------------------------------------------API integration------------------------------------------------
async function fetchAllScenarios() {
    try {
        const scenariosCollection = collection(db, 'Scenario');
        const scenariosSnapshot = await getDocs(scenariosCollection);
 
        const allScenariosData = [];
 
        scenariosSnapshot.forEach((doc) => {
            const scenarioData = doc.data();
            allScenariosData.push({
                id: doc.id,
                ...scenarioData,
            });
        });
 
        return allScenariosData;
    } catch (error) {
        console.error('Error fetching all scenarios:', error);
        return [];
    }
}
async function fetechDS() {
    try {
       
           let tdArr= []
       
 
        // Fetch existing scenarios
        const existingScenarios = await fetchAllScenarios();
        // Your existing code for fetching data from the form
        
        existingScenarios.forEach((scenario)=>{
                
           
            let tds=0;
            let tdsflag=false;
            let obj=scenario;
            console.log(obj['scenarios'][2]);
            if(obj['scenarios']!==undefined)
            {
                let scenariosArr=obj['scenarios']
                for(let elt in scenariosArr)
                {
                    //console.log(scenariosArr[elt]);
                    let innerElt=scenariosArr[elt];
                    //console.log(Object.keys(innerElt).includes('totalDimensionlessScore'));
                    if(Object.keys(innerElt).includes('totalDimensionlessScore'))
                    {
                     
                        //console.log(innerElt.totalDimensionlessScore);
                        tdArr.push(innerElt.totalDimensionlessScore);
                        tdsflag=true;
                        break;
                    }
                }
 
                //console.log(tds);
            }
            

            if(!tdsflag)
            {
                tdArr.push(0);
            }
        
              

        })
       // console.log(totalDimensionlessScore);
        return tdArr;
 
        // Add data to localStorage
        //localStorage.setItem('scenarioInputData', JSON.stringify(scenarioInputData));
        return scenarioInputData.scenarios

 
    } catch (error) {
        console.log(error);
    }
}

fetechDS().then((data)=>{
    console.log(data);
});

//---------------------------------------------for future use---------------------------------------------------


// function submitCategoryData() {
//     const categoryData = {
//         categories: []
//     };
//     console.log("submitted!!!");
//     document.querySelectorAll('.data-table tbody tr').forEach(row => {
//         const category = {
//             name: row.querySelector('.category-name')?.value,
//             weight: row.querySelector('.category-weight')?.value,
//             direction: row.querySelector('.category-direction')?.value,
//             evaluationType: row.querySelector('.category-evaluation-type')?.value
//         };

//         categoryData.categories.push(category);
//     });

//     // Add data to localStorage
//     localStorage.setItem('categoryData', JSON.stringify(categoryData));
//     console.log('Script executed!');
//     alert("Category data submitted!");
// }


// function addCategoryCells(row) {
//     // Example cells, modify as per your needs
//     const rowIndex = row.rowIndex;
//     addCell(row, `Category${rowIndex}`);
//     addCell(row, createInput("text", "category-name"));
//     addCell(row, createInput("number", "category-weight", "0.01"));
//     addCell(row, createSelect("category-direction", ["Positive", "Negative"]));
//     addCell(row, createSelect("category-evaluation-type", ["Ordinal", "Linear", "Descriptive"]));
// }


// function addScenarioDataCells(row) {
//     // Example cells, modify as per your needs
//     addCell(row, `Scenario${row.rowIndex}`);
//     addCell(row, createInput("number", "emissions-reduction", "1", "0"));
//     addCell(row, createSelect("air-quality-impact", ["Low", "Medium", "High"]));
//     addCell(row, createSelect("wildlife-disturbance", ["Low", "Medium", "High"]));
//     addCell(row, createSelect("income-generation", ["Low", "Medium", "High"]));
//     addCell(row, createInput("number", "job-created", "1", "0"));
// }




// function submitScenarioData() {
//     // Fetch data from the form
//     const scenarioData = {
//         scenarios: []
//     };

//     document.querySelectorAll('.data-table:nth-child(3) tbody tr').forEach(row => {
//         const scenario = {
//             emissionsReduction: row.querySelector('.emissions-reduction')?.value,
//             airQualityImpact: row.querySelector('.air-quality-impact')?.value,
//             wildlifeDisturbance: row.querySelector('.wildlife-disturbance')?.value,
//             incomeGeneration: row.querySelector('.income-generation')?.value,
//             jobCreated: row.querySelector('.job-created')?.value
//         };

//         scenarioData.scenarios.push(scenario);
//     });

//     // Add data to localStorage
//     localStorage.setItem('scenarioData', JSON.stringify(scenarioData));
    
//     alert("Scenario data submitted!");
// }


// Event listeners for adding rows
// document.getElementById("addCategoryButton").addEventListener("click", function () {
//     addRow("categoryTable");
// });

// document.getElementById("addScenarioDataButton").addEventListener("click", function () {
//     addRow("scenarioDataTable");
// });

// document.getElementById('submitCategoryButton').addEventListener('click', submitCategoryData);
  
// document.getElementById('submitScenarioDataButton').addEventListener('click', submitScenarioData);


// dashboard.js


//------------------------------------------------------------------------------------------------------------------------