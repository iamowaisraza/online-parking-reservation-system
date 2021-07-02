import authReducer from "./authReducer";
import parkingReducer from "./parkingReducer";
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    parking: parkingReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});

export default rootReducer;