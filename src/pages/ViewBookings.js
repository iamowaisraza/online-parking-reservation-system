import BookingListing from '../components/listing/booking_listing/BookingListing';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const ViewBookings = () => {
    const [bookings, setBookings] = useState(null)
    useFirestoreConnect(['bookings', 'locations']);
    const { firestore, firebase } = useSelector(state => state);
    
    useEffect(() => {
        // if (!firebase.auth.uid) return <Redirect to="/login" />
        if(firestore.ordered.bookings !== undefined){
            let myBookings = firestore.ordered.bookings.filter(el => el.userID === firebase.auth.uid);
            setBookings(myBookings);
        }
        console.log(firestore.ordered.bookings)
    }, [firestore.ordered.bookings]);

    if (!firebase.auth.uid) return <Redirect to="/login" />

    return (
        <>
            <BookingListing data={bookings} locations={firestore.ordered.locations} status="my"/>
        </>
    )
}

export default ViewBookings;