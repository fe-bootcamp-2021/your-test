import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URl,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;

// class Firebase {
//   constructor() {
//     if (!app.apps.length) {
//       app.initializeApp(firebaseConfig);
//     } else {
//       app.app();
//     }

//     this.auth = app.auth();
//     this.db = app.firestore();
//   }

//   login(email, password) {
//     return this.auth.signInWithEmailAndPassword(email, password);
//   }

//   logout() {
//     return this.auth.signOut();
//   }

//   async register(name, email, password) {
//     await this.auth.createUserWithEmailAndPassword(email, password);
//     return this.auth.currentUser.updateProfile({
//       displayName: name,
//     });
//   }

//   addQuote(quote) {
//     if (!this.auth.currentUser) {
//       return alert("Not authorized");
//     }

//     return this.db
//       .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
//       .set({
//         quote,
//       });
//   }

//   isInitialized() {
//     return new Promise((resolve) => {
//       this.auth.onAuthStateChanged(resolve);
//     });
//   }

//   getCurrentUsername() {
//     return this.auth.currentUser && this.auth.currentUser.displayName;
//   }

//   async getCurrentUserQuote() {
//     const quote = await this.db
//       .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
//       .get();
//     return quote.get("quote");
//   }
// }

// export default new Firebase();
