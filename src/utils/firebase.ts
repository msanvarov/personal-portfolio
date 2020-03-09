import * as firebase from "firebase";
import * as dotenv from "dotenv";
import flamelink from "flamelink";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const app = flamelink({
  firebaseApp,
  dbType: "rtdb", //  'rtdb' or 'cf' for Realtime DB or Cloud Firestore
  env: "production",
  locale: "en-US",
  precache: true
});
