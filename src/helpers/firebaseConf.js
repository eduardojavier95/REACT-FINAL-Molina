import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: import.meta.APIKEY,
    authDomain: import.meta.AUTHDOMAIN,
    projectId: import.meta.PROJECTID,
    storageBucket: import.meta.STORAGEBUCKET,
    messagingSenderId: import.meta.MESSAGINGSENDERID,
    appId: import.meta.APPID
}

export const app = initializeApp(firebaseConfig)