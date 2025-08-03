import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyByokJCHS_Ol4XncYKTH-DGXpeUs8_ipt8",
    authDomain: "movieauthokten.firebaseapp.com",
    projectId: "movieauthokten",
    storageBucket: "movieauthokten.firebasestorage.app",
    messagingSenderId: "911175021282",
    appId: "1:911175021282:web:9fdd0f2080b8aa7fe9e4bb",
    measurementId: "G-HZPE9LFYEZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
