import { db } from './auth.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

// Add data to a collection
const addToCollection = async () => {
  try {
    const docRef = await addDoc(collection(db, 'test'), {
      key1: 'value1',
      key2: 'value2',
    });
    console.log('Document written with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

addToCollection();
