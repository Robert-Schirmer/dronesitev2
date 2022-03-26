import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAOxnHZ_q0c54xnFM_W56CYHfg0zXp2bbw",
  authDomain: "iflydrones.firebaseapp.com",
  projectId: "iflydrones",
  storageBucket: "iflydrones.appspot.com",
  messagingSenderId: "418968686440",
  appId: "1:418968686440:web:b01be5fbc333459b4410dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export default app;
