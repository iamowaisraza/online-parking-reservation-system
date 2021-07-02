export const addParking = (parking, setNotification, clearAll) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('bookings').add(parking)
        .then((res) => {
            clearAll();
            setNotification({ show: true, msg: 'Parking Successfully Booked.', variant: 'success' });
            dispatch({type: 'ADD_PARKING', parking});
        }).catch(error => {
            console.log({error})
            setNotification({ show: true, msg: error.message, variant: 'error' })
            dispatch({type: 'ADD_PARKING_ERROR', error});
        });
    }
}

export const cancelParking = (id, setNotification) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection("bookings").doc(id).delete().then(() => {
            setNotification({ show: true, msg: 'Parking Successfully Deleted.', variant: 'success' });
        }).catch((error) => {
            setNotification({ show: true, msg: error.message, variant: 'error' })
        });
    }
}

export const addFeedback = (feedback, setNotification, setFeedback) => {
    console.log({feedback})
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('feedbacks').add({
            userID: feedback.userID,
            feedback: feedback.message,
            fullName: feedback.fullName,
            initials: feedback.initials,
            email: feedback.email,
            replies: [],
            createdAt: new Date()
        })
        .then(() => {
            setNotification({ show: true, msg: 'Feedback Successfully Submitted', variant: 'success' });
            setFeedback({ value: '', error: false, helperText: '' });
        }).catch(error => {
            setNotification({ show: true, msg: error.message, variant: 'error' })
        });
    }
}

export const addFeedbackReply = (feedback, id, setReply) => {
    console.log({feedback})
    return (dispatch, getState, { getFirestore,getFirebase }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('feedbacks').doc(id).update({
            replies: firebase.firestore.FieldValue.arrayUnion(feedback)
        })
        .then((res) => {
            console.log('reply added success', res);
            // setNotification({ show: true, msg: 'Feedback Successfully Submitted', variant: 'success' });
            setReply({ value: '', error: false, helperText: '' });

        }).catch(error => {
            console.log('reply added error', error);
            // setNotification({ show: true, msg: error.message, variant: 'error' })
        });
    }
}