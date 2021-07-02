import AddBookingModal from '../modules/add_booking/AddBookingModal';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
const TopView = () => {
    const [addBooking, setAddBooking] = useState(false);
    const [locationID, setLocationID] = useState('');

    const addBookingHandler = id => {
        setLocationID(id);
        setAddBooking(true);
    }

    useFirestoreConnect(['locations']);
    const { firestore } = useSelector(state => state);
    return (
        <>
            {addBooking && <AddBookingModal show={addBooking} setShow={setAddBooking} locationID={locationID}/>}
            <Grid container style={{ marginTop: '100px' }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={5}>
                        {
                            firestore.ordered.locations !== undefined ?
                                firestore.ordered.locations.map(el => {
                                    return (
                                        <Grid item xs={4}>
                                            <div className="container-cstm" id={el.id} onClick={() => addBookingHandler(el.id)}>
                                                <img src={el.image} />
                                                <div className="title">{el.title}</div>
                                            </div>
                                        </Grid>
                                    )
                                })
                                :
                                "Loading"
                        }
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}

export default TopView;