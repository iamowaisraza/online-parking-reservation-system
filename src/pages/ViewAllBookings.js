import BookingListing from '../components/listing/booking_listing/BookingListing';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
const ViewAllBookings = () => {
    useFirestoreConnect(['bookings', 'locations']);
    const { firestore, firebase } = useSelector(state => state);
    
    if (!firebase.auth.uid) return <Redirect to="/login" />
    
    return (
        <>
            <BookingListing
                data={firestore.ordered.bookings === undefined ? null : firestore.ordered.bookings}
                locations={firestore.ordered.locations === undefined ? null : firestore.ordered.locations}
                status="all"
            />
        </>
    )
}

export default ViewAllBookings;