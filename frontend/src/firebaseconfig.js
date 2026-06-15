import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "hershield-ai.firebaseapp.com",
  projectId: "hershield-ai",
  storageBucket: "hershield-ai.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

initializeApp(firebaseConfig);
