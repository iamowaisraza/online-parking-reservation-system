import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyB6Pq0TqYjLNNrh-GjqppiXG-hRV0c1I54",
    authDomain: "parking-system-task.firebaseapp.com",
    projectId: "parking-system-task",
    storageBucket: "parking-system-task.appspot.com",
    messagingSenderId: "429114347410",
    appId: "1:429114347410:web:f94b317eebae4a94a2fb4b",
    measurementId: "G-N9MDHB3RS0"
};
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });

var secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

export default secondaryApp;