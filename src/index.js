import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import fbConfig from './config/fbConfig';
import { useSelector } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
// import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbConfig)
  )
);

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading...</div>;
  return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
