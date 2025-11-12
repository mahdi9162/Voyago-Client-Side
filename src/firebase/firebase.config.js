// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDPlkXUGGuGIR31x-DiVKpYadH4m4gy2bw',
  authDomain: 'voyago-2805d.firebaseapp.com',
  projectId: 'voyago-2805d',
  storageBucket: 'voyago-2805d.firebasestorage.app',
  messagingSenderId: '380683657849',
  appId: '1:380683657849:web:36c2b8810d18c7397e6aa8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
