//firebase

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDVTrAUmul68HurWHx8rQdba6et6XZ7ZJw",
  authDomain: "olx-clone-50c72.firebaseapp.com",
  projectId: "olx-clone-50c72",
  storageBucket: "olx-clone-50c72.appspot.com",
  messagingSenderId: "446770526827",
  appId: "1:446770526827:web:8d36bf8fd23eacd9dc4f2e",
  measurementId: "G-JN64G4TT7P"
};


const fetchItemsFromFireStore = async () => {
  try {
    const productsCollection = collection(firestore, 'Products');

    const productsQuery = query(productsCollection, orderBy("date", "desc"));
    const productsSnapshot = await getDocs(productsQuery);

    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productsList;
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage(app);
const firestore = getFirestore(app);


export {
  auth,
  provider,
  storage,
  firestore,
  fetchItemsFromFireStore
}