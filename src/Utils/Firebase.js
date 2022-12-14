import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCGTK45mAWL_-qmnpCIoWY9Xv34ScQYEjI",
    authDomain: "admin-app-74fdd.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: " https://stackoverflow.com/a/74750337==https://DATABASE_NAME.firebaseio.com",
    projectId: "admin-app-74fdd",
    storageBucket: "admin-app-74fdd.appspot.com",
    messagingSenderId: "799609018927",
    appId: "APP_ID",
  };

const app = initializeApp(firebaseConfig);

export default app;

  