// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDq-Os_yGFpCRNX16hzxKcW4q44i_BNko",
    authDomain: "memories-app-354400.firebaseapp.com",
    projectId: "memories-app-354400",
    storageBucket: "memories-app-354400.appspot.com",
    messagingSenderId: "228714459042",
    appId: "1:228714459042:web:dfe25dbe96e94b2e6b8cfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export { signInWithPopup }