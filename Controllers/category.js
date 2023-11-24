// Counter to track the number of added categories
let categoryCounter = 0;


// // // Function to delete a category row
function deleteCategory(rowNumber) {
    const categoryTable = document.getElementById("categoryDetails");
    categoryTable.deleteRow(rowNumber);
}


// Function to add a new row to the Category Details Table
function addCategory() {
    // Increment the category counter
    // categoryCounter++;
  
    // // Get the Category Details Table
    // const categoryTable = document.getElementById("categoryDetails");
  
    // // Make the table visible if it was hidden
    // if (categoryTable.style.display === "none") {
    //   categoryTable.style.display = "table";
    // }
  
    // // Create a new row
    // const newRow = categoryTable.insertRow();
  
    // // Create cells for each column
    // const nameCell = newRow.insertCell(0);
    // const weightCell = newRow.insertCell(1);
    // const directionCell = newRow.insertCell(2);
    // const typeCell = newRow.insertCell(3);
    // const actionCell = newRow.insertCell(4);
  
    // Set the content of each cell
    // nameCell.innerHTML = `<input type="text" id="categoryName${categoryCounter}" />`;
    // weightCell.innerHTML = `<input type="number" step="0.01" id="categoryWeight${categoryCounter}" />`;
    // directionCell.innerHTML = `<select id="categoryDirection${categoryCounter}">
    //                               <option value="Positive">Positive</option>
    //                               <option value="Negative">Negative</option>
    //                           </select>`;
    // typeCell.innerHTML = `<select id="categoryType${categoryCounter}">
    //                           <option value="Linear">Linear</option>
    //                           <option value="Ordinal">Ordinal</option>
    //                           <option value="Descriptive">Descriptive</option>
    //                       </select>`;

     // Create delete button
    // const deleteButton = document.createElement("button");
    // deleteButton.className = "delete-button";
    // deleteButton.textContent = "Delete";
    // deleteButton.addEventListener("click", () => deleteCategory(categoryCounter));
    // actionCell.appendChild(deleteButton);
    // Add a delete button
    const tableBody = document.querySelector('table#categoryDetails tbody');

    // Show the table if it's hidden
    if (tableBody.parentElement.style.display === "none") {
        tableBody.parentElement.style.display = "table";
    }

    // Create a new row
    const newRow = tableBody.insertRow(-1);
    addCell(newRow, createInput("text", "category-name"));
    addCell(newRow, createInput("number", "category-weight", "0.01"));
    addCell(newRow, createSelect("category-direction", ["Positive", "Negative"]));
    addCell(newRow, createSelect("category-type", ["Ordinal", "Linear", "Descriptive"]));
    
   
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






function getDocIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("docId");
}


// Add event listener to the Add Category button
const addCategoryButton = document.getElementById("addCategoryBtn");
addCategoryButton.addEventListener("click", addCategory);

// Add event listener to the Commit button
const commitCategoriesButton = document.getElementById("commitCategoriesBtn");
commitCategoriesButton.addEventListener("click", commitCategories);





//-----------------------------------------------------------------------------------------------------------------

import {
  doc,
  updateDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// // Function to handle Commit button click
import { db } from '../Auth/auth.js';
async function commitCategories() {
  // Iterate through rows and extract data
  try {
    let sid=getDocIdFromUrl()
    if (sid) {

    //-----------------------------------------------------------------
        // Aditi
        isCommitClicked = true; // Set the flag to true when Commit is clicked
        updateCategoryDetailsArray(); // Update the array after Commit is clicked
        
         // Find the minimum and maximum values of x
        const xValues = categoryDetails.map(category => category.x);
        const min_X = Math.min(...xValues);
        const max_X = Math.max(...xValues);

         // Log the minimum and maximum values of x
        console.log("Minimum x value:", min_X);
        console.log("Maximum x value:", max_X);

        // Calculate and log the linear score for each category
        console.log("Linear Scores:");
        categoryDetails.forEach(category => {
            const linearScore = (category.x - min_X) / (max_X - min_X);
            console.log(`Category: ${category.name}, Linear Score: ${linearScore}`);

            // Calculate dimensionless score
            const dimensionlessScore = category.weight * linearScore;
            console.log(`Category: ${category.name}, Dimensionless Score: ${dimensionlessScore}`);
        });

        // Calculate and log the total dimensionless score per scenario
        const totalDimensionlessScore = categoryDetails.reduce((total, category) => {
            const linearScore = (category.x - min_X) / (max_X - min_X);
            const dimensionlessScore = category.weight * linearScore;
            return total + dimensionlessScore;
        }, 0);

        console.log("Total Dimensionless Score per Scenario:", totalDimensionlessScore);

        // Store the totalDimensionlessScore in local storage
        localStorage.setItem("totalDimensionlessScore", totalDimensionlessScore);

      //---------------------------------------------------------------
      const categoryTable = document
        .getElementById("categoryDetails")
        .querySelector("tbody");
      let categoryData = {};

      //1ST ROW IS THE HEADER, SO SELECTING FROM THE SECOND ROW
      for (let i = 1; i < categoryTable.rows.length; i++) {
        const row = categoryTable.rows[i];
        const categoryName = row.cells[0].querySelector("input")?.value;
        const categoryWeight = row.cells[1].querySelector("input")?.value;
        const categoryDirection = row.cells[2].querySelector("select")?.value;
        const categoryType = row.cells[3].querySelector("select")?.value;
        //wE ARE NOT ADDING 1 TO IT SINCE WE ARE SKIPPING THE FIRST ROW
        categoryData[`C${i}`] = {
          "Category Name":  categoryName,
          "Category Weight": Number(categoryWeight) ,
          "Category Direction": categoryDirection,
          "Category Type": categoryType,
          
        };
      }

      // Add any logic you need for committing categories
      console.log(categoryData);

      
      //Add to the database
      const scenarioDocRef = doc(db, "Scenario", sid);

      try {
        // await updateDoc(scenarioDocRef, {
        //   categories: categoryData,

        // });


      //  console.log("Category data added to the scenario document!");
      const docSnapshot = await getDoc(scenarioDocRef);
    const existingScenarios = docSnapshot.data()?.scenarios || [];
    //existingScenarios['totalDimensionlessScore']=totalDimensionlessScore
     console.log(totalDimensionlessScore);

    // Append the new scenario data
    const updatedScenarios = [
        ...existingScenarios,
        {
            totalDimensionlessScore: Number(totalDimensionlessScore),
        },
        {
            
            categories: categoryData,
        }
    ];

    // Update the document with the updated scenarios array
    await updateDoc(scenarioDocRef, {
        scenarios: updatedScenarios,
    });

    console.log("Category data and Total Dimensionless Score added to the scenario document!");
      } catch (error) {
        console.error(
          "Error adding category data to the scenario document: ",
          error
        );
      }

      // Redirect to dashboard.html
     
    }
    window.location.href = "dashboard.html";
  } catch (error) {
    console.log(error);
  }
}

//-----------------------------------------------------------------------
//@@@@@Aditi

// Array to store category details
const categoryDetails = [];

// Flag to track if the user has clicked the Commit button
let isCommitClicked = false;

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

function addCell(row, content) {
    const cell = row.insertCell(-1);
    cell.appendChild(content);
}
//--------------------------------------------------------------------------------------------------------------------


// Function to check if the docId is valid
// function isValidDocId(docId) {
//     // Add your validation logic here
//     // For example, you might want to check if it's a valid format or if it exists in your database
//     // Return true if it's valid, false otherwise
//     return docId !== null && docId !== undefined && docId !== "";
//   }
  
  // Function to redirect the user to category.html if the docId is valid
  function redirectToCategoryPage() {
    const docId = getDocIdFromUrl();
  
    if (isValidDocId(docId)) {
      // Valid docId, redirect to category.html
      window.location.href = `category.html?docId=${docId}`;
    } else {
      // Invalid docId, handle the error (redirect to an error page, show an error message, etc.)
      window.location.href = "dashboard.html";
    }
  }
  
  // Call the function when the page loads
  let  pldflag=true;
 if(pldflag)
 {
    pldflag=false;
    redirectToCategoryPage();
 }