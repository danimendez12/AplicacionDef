import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    "apiKey": "AIzaSyBXllOq3Iwt5X6xASJ5ouCpbUqy_7BjRoA",
    "authDomain": "ui-covid.firebaseapp.com",
    "projectId": "ui-covid",
    "storageBucket": "ui-covid.firebasestorage.app",
    "messagingSenderId": "890608072950",
    "appId": "1:890608072950:web:dc44a16f97d306d7e754d7",
    "databaseURL": ""
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);