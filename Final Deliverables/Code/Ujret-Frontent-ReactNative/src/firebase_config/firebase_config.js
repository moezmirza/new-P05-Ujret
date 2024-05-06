// firebase_config/firebase_config.js

import {initializeApp} from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyC2DqK7vWNPgwPjveWvesmsDm8k4IWxEAI',
//   authDomain: 'ujret-18361.firebaseapp.com',
//   projectId: 'ujret-18361',
//   storageBucket: 'ujret-18361.appspot.com',
//   messagingSenderId: '838009851461	',
//   appId: '1:838009851461:android:54d74f025aca207aca5d2c',
// };
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD_IQqtoOisG1cL3jw1vE-xt7waNdNSjQ4',
  authDomain: 'ujret-node-backend.firebaseapp.com',
  projectId: 'ujret-node-backend',
  storageBucket: 'ujret-node-backend.appspot.com',
  messagingSenderId: '388594123740',
  appId: '1:388594123740:web:c94d0b763ea3f057dd8519',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// const auth = getAuth(app);

export {auth};
