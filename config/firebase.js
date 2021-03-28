import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvTuR6_Q5fFY0Q80rW3IXsZzE7nQD_N_E",
    authDomain: "whatsapp-clone-c.firebaseapp.com",
    projectId: "whatsapp-clone-c",
    storageBucket: "whatsapp-clone-c.appspot.com",
    messagingSenderId: "603346447091",
    appId: "1:603346447091:web:ba812d5b5793e49bc06586",
    measurementId: "G-13PD0QQHG1"
};

const app = !firebase.apps.length ?
    firebase.initializeApp(firebaseConfig) :
    firebase.app();

const db = app.firestore();
const auth = app.auth();
let provider = new firebase.auth.GoogleAuthProvider();
provider = provider.setCustomParameters({
    prompt: 'select_account'
});
export { db, auth, provider };