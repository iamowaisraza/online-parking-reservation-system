import TopView from '../components/dashboard/TopView';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
const UserDashboard = () => {
    useFirestoreConnect(['parking', 'users'])
    const { firebase } = useSelector(state => state);

    if (!firebase.auth.uid) return <Redirect to="/login" />
    return (
        <>
            <TopView />
        </>
    )
}

export default UserDashboard;