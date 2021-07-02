import UsersListing from '../components/listing/users_listing/UsersListing';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
const ViewUsers = () => {
    useFirestoreConnect(['users'])
    const { firestore, firebase } = useSelector(state => state);
    console.log('yes firestore', firestore)
    if (!firebase.auth.uid) return <Redirect to="/login" />
    return (
        <>
            {
                firestore.ordered.users && <UsersListing data={firestore.ordered.users}/>
            }
            
        </>
    )
}

export default ViewUsers;