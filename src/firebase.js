import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAbdqfn0Xc0tjlsicoPzTbnCzRmakq4Ddw",
    authDomain: "echoagri-84301.firebaseapp.com",
    projectId: "echoagri-84301",
    storageBucket: "echoagri-84301.appspot.com",
    messagingSenderId: "63733488939",
    appId: "1:63733488939:web:64e4e4ee1816be79cab96e",
    measurementId: "G-DCZTSQJNM2"
};

const app = initializeApp(firebaseConfig);

export default app;