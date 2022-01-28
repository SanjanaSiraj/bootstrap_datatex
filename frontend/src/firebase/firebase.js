import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyBL4I5iCTB1U4pR2iDW7oC0Kg2P6hesKcc",
    authDomain: "datatex-48bdb.firebaseapp.com",
    projectId: "datatex-48bdb",
    storageBucket: "datatex-48bdb.appspot.com",
    messagingSenderId: "732794587058",
    appId: "1:732794587058:web:f2f5f09f99fc6bce1346ab",
    measurementId: "G-H4ZP8DVC04"
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export {storage}



//
//
//
//
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
//
// const firebaseConfig = {
//     apiKey: "super secret keys.....asgvegxgevergfvr",
//     authDomain: "tallans-imageupload-tutorial.firebaseapp.com",
//     databaseURL: "https://tallans-imageupload-tutorial.firebaseio.com",
//     projectId: "tallans-imageupload-tutorial",
//     storageBucket: "tallans-imageupload-tutorial.appspot.com",
//     messagingSenderId: "super secret keys.....asgvegxgevergfvr",
//     appId: "super secret app id....adsfa;lsdkjf",
//     measurementId: "super secret as;dlkfjal;dskjf"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
//
//
//
//
//
//
//
//
// import firebase from 'firebase/app'
//
//
// var firebaseConfig = {
//
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// //analytics is optional for this tutoral
// firebase.analytics();
//
// const storage = firebase.storage()
//
// export {storage}
