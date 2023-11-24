import { initializeApp } from "firebase/app";
import { getFirestore, collection,getDocs,addDoc,deleteDoc,query,where } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDIEfKKnpQvKrHuOoiIzip9b13mUjNRH4E",
    authDomain: "iproject-7f215.firebaseapp.com",
    databaseURL: "https://iproject-7f215-default-rtdb.firebaseio.com",
    projectId: "iproject-7f215",
    storageBucket: "iproject-7f215.appspot.com",
    messagingSenderId: "856244457860",
    appId: "1:856244457860:web:42557f9ddfaaa163f6cdd1",
    measurementId: "G-00H33TT2WP"
  };
  
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

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

async function fetchDS() {
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

// fetechDS().then((data)=>{
//     console.log(data);
// });
// fetchDS().then((data) => {
//     console.log("Total Dimensionless Scores Array:", data);
  
//     // Assuming your Firestore collection for totalDimensionlessScores is called 'totalDimensionlessScores'
//     const tdsCollection = firestore.collection('totalDimensionlessScores');
  
//     // Adding each totalDimensionlessScore to the new collection
//     data.forEach((tds) => {
//       tdsCollection.add({ totalDimensionlessScore: tds })
//         .then((docRef) => {
//           console.log("Total Dimensionless Score added with ID:", docRef.id);
//         })
//         .catch((error) => {
//           console.error("Error adding Total Dimensionless Score:", error);
//         });
//     });
//   });


async function exec() {
    let tdArr = await fetchDS();
    
    // Assuming your Firestore collection for totalDimensionlessScores is called 'totalDimensionlessScores'
    const tdsCollection = collection(db, 'totalDimensionlessScores');
  
    // Adding each totalDimensionlessScore to the collection
    tdArr.forEach(async (tds) => {
      await addDoc(tdsCollection, {
        totalDimensionlessScore: tds
      });
    });
  
    console.log("Total Dimensionless Scores added to the collection!");
  }
  

  async function removeAllDocuments(collectionName) {
    try {
      const q = query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
  
      // Iterate through the documents and delete each one
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log(`Document with ID ${doc.id} deleted successfully.`);
      });
  
      console.log(`All documents in collection ${collectionName} removed.`);
    } catch (error) {
      console.error('Error removing documents:', error);
    }
  }


  async function fetchAllTotalDimensionlessScoresWithID() {
    try {
      const totalDimensionlessScoresCollection = collection(db, 'totalDimensionlessScores');
      const totalDimensionlessScoresSnapshot = await getDocs(totalDimensionlessScoresCollection);
  
      const allTotalDimensionlessScores = [];
  
     
        totalDimensionlessScoresSnapshot.forEach((doc) => {
            const totalDimensionlessScoreData = doc.data();
            allTotalDimensionlessScores.push({
            id: doc.id,
            ...totalDimensionlessScoreData,
            });
        });
  
      return allTotalDimensionlessScores;
    } catch (error) {
      console.error('Error fetching total dimensionless scores:', error);
      return [];
    }
  }

  async function fetchAllTotalDimensionlessScores() {
    try {
      const totalDimensionlessScoresCollection = collection(db, 'totalDimensionlessScores');
      const totalDimensionlessScoresSnapshot = await getDocs(totalDimensionlessScoresCollection);
  
      const allTotalDimensionlessScores = [];
  
      totalDimensionlessScoresSnapshot.forEach((doc) => {
        const totalDimensionlessScoreData = doc.data().totalDimensionlessScore;
        allTotalDimensionlessScores.push(totalDimensionlessScoreData);
   
      });
  
      return allTotalDimensionlessScores;
    } catch (error) {
      console.error('Error fetching total dimensionless scores:', error);
      return [];
    }
  }
//exec();

// const collectionName = 'totalDimensionlessScores'; // Replace with your actual collection name
// removeAllDocuments(collectionName);
//fetchAllTotalDimensionlessScores().then(data=>console.log(data))
fetchAllTotalDimensionlessScoresWithID().then(data=>console.log(data))

async function recommendedDimensionlessScore() {
    try {
        let data = await fetchAllTotalDimensionlessScoresWithID();
       // console.log("Fetched Data:", data);

        if (data.length === 0) {
            console.log("No data found.");
            return;
        }

        let dataArr = Array.from(data);
        let maxval = -1000000000;
        let maxidx;

        dataArr.forEach((cval, cidx, oarr) => {
            let val = cval.totalDimensionlessScore;
            if (val > maxval) {
                maxval = val;
                maxidx = cidx;
            }
        });

        // console.log("Maximum Dimensionless Score:", maxval);
        // console.log("Index of Maximum Dimensionless Score:", maxidx);

        // If you want to get the corresponding dataId
        if (maxidx !== undefined) {
            let maxDataId = dataArr[maxidx].id;
           // console.log("DataId of Maximum Dimensionless Score:", maxDataId);

            // Find the corresponding document in the "Scenario" collection
            const scenarioCollection = collection(db, 'Scenario');

            const snap=await getDocs(scenarioCollection);
           // console.log("All Documents in Scenario Collection:");
            // snap.forEach((doc) => {
                
            //     console.log( doc.data().scenarios);
            //     const obj = doc.data()//.scenarios.find(item => item.totalDimensionlessScore);
            //     // if(totalDimensionlessScore == maxval)
            //     // {
            //     //     console.log('Document:', doc.id, doc.data());
            //     // }
               
            // });
            snap.forEach((doc) => {
               // console.log(doc.data().scenarios);
            
                const scenarios = doc.data().scenarios;
                const totalDimensionlessScoreObject = scenarios.find(item => item.totalDimensionlessScore);
                
                if (totalDimensionlessScoreObject) {
                    const totalDimensionlessScore = totalDimensionlessScoreObject.totalDimensionlessScore;
                    //console.log('Total Dimensionless Score:', totalDimensionlessScore);
                    
                    // Check if the totalDimensionlessScore is equal to maxval
                    if (totalDimensionlessScore == maxval) {
                        console.log('Document:', doc.id, doc.data());
                        return doc.data();
                    }
                }
            });

            
            // const querySnapshot = await getDocs(
            //     query(scenarioCollection, where('scenarios.1.totalDimensionlessScore', '==', maxval))
            // );
            
            //console.log("Query Value:", Number(maxval));
            
            // querySnapshot.forEach((doc) => {
            //     console.log('Document:', doc.id, doc.data());
            // });
            
           // console.log("Documents with Maximum Dimensionless Score:", querySnapshot.docs.length);
            
        }
    } catch (error) {
        console.error("Error in recommendedDimensionlessScore:", error);
    }
}

// Call the function
recommendedDimensionlessScore();


