import moment from "moment";
import secondaryApp from "../../config/secondaryFbConfig";

export const signIn = (email, password, setNotification) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                setNotification({ show: true, msg: "You're Successfully Logged In :)", variant: 'success' });
                dispatch({ type: 'LOGIN_SUCCESS', user: response.user });
            }).catch(error => {
                setNotification({ show: true, msg: 'Invalid Credentials!', variant: 'error' });
                dispatch({ type: 'LOGIN_ERROR', error });
            });
    }
}

export const logout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: 'LOGOUT_SUCCESS' });
            });
    }
}

export const signup = ({ email, password, fname, lname, type }, setNotification, clearAll = null) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log('signup response', response)
                return firestore.collection('users').doc(response.user.uid).set({
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    initials: fname[0].toUpperCase() + lname[0].toUpperCase(),
                    createdAt: moment().format('MMMM Do YYYY'),
                    type: type
                });
            })
            .then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' });
                setNotification({ show: true, msg: `${clearAll !== null ? "User Successfully Added :)" : "You're Successfully Signed Up :)"}`, variant: 'success' });
                if (clearAll !== null) clearAll();
            })
            .catch(error => {
                dispatch({ type: 'SIGNUP_ERROR', error });
                setNotification({ show: true, msg: error.message, variant: 'error' });
            });
    }
}

export const addUser = ({ email, password, fname, lname, type }, setNotification, clearAll = null) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // const firebase = getFirebase('Secondary');
        const firestore = getFirestore();
        secondaryApp.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log('adduser response', response.uid)
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: fname,
                lastName: lname,
                email: email,
                initials: fname[0].toUpperCase() + lname[0].toUpperCase(),
                createdAt: moment().format('MMMM Do YYYY'),
                type: type
            });
        })
        .then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
            setNotification({ show: true, msg: `${clearAll !== null ? "User Successfully Added :)" : "You're Successfully Signed Up :)"}`, variant: 'success' });
            if (clearAll !== null) clearAll();
            secondaryApp.auth().signOut();
        })
        .catch(error => {
            dispatch({ type: 'SIGNUP_ERROR', error });
            setNotification({ show: true, msg: error.message, variant: 'error' });
        });
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then(response => {
        //         console.log('signup response', response)
        //         return firestore.collection('users').doc(response.user.uid).set({
        //             firstName: fname,
        //             lastName: lname,
        //             email: email,
        //             initials: fname[0].toUpperCase() + lname[0].toUpperCase(),
        //             createdAt: new Date(),
        //             type: type
        //         });
        //     })
        //     .then(() => {
        //         dispatch({ type: 'SIGNUP_SUCCESS' });
        //         setNotification({ show: true, msg: `${clearAll !== null ? "User Successfully Added :)" : "You're Successfully Signed Up :)"}`, variant: 'success' });
        //         if (clearAll !== null) clearAll();
        //     })
        //     .catch(error => {
        //         dispatch({ type: 'SIGNUP_ERROR', error });
        //         setNotification({ show: true, msg: error.message, variant: 'error' });
        //     });
    }
}

// let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
// let authWorkerAuth = firebase.auth(authWorkerApp);
// authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials

// authWorkerAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
// });