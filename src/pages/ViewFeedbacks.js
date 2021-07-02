import FeedbacksListing from '../components/listing/feedbacks_listing/FeedbacksListing';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
const ViewFeedbacks = () => {
    useFirestoreConnect(['feedbacks', 'users']);
    const { firestore, firebase } = useSelector(state => state);

    let currentUser = null;
    if (firestore.ordered.users !== undefined)
        currentUser = firestore.ordered.users.filter(el => el.id === firebase.auth.uid);

    if (!firebase.auth.uid) return <Redirect to="/login" />
    return (
        <>
            {
                firestore.ordered.feedbacks && currentUser ? <FeedbacksListing data={firestore.ordered.feedbacks} currentUser={currentUser[0]} /> : "Loading..."
            }
        </>
    )
}

export default ViewFeedbacks;