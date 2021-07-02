import { makeStyles } from '@material-ui/core/styles';
import Card from './Card'
import Grid from '@material-ui/core/Grid';
import ShowNotification from "../../../components/modules/ShowNotification";
import { useState } from 'react';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    bgColor: {
        backgroundColor: '#fff'
    },
    margin: {
        marginLeft: '30px',
        marginRight: '30px',
    }
});
export default function BookingListing({ data, locations, status }) {
    const classes = useStyles();
    const [notification, setNotification] = useState({ show: false, msg: '', variant: '' });
    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') return;
        setNotification({ show: false, msg: '', variant: '' });
    }
    return (
        <>
            {notification.show && <ShowNotification show={notification.show} msg={notification.msg} variant={notification.variant} close={handleCloseNotification} />}
            <div className="container py-5">
                <div className={`card card-custom`}>
                    <div className={`card-header ${classes.bgColor}`}>
                        <h2 className="align-items-start flex-column mb-0">Bookings</h2>
                    </div>

                    <div className={`card-body py-4 ${classes.margin}`}>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={1}></Grid> */}
                            <Grid item xs={12}>
                                <Grid container spacing={5}>
                                    {data && locations ? data.map(el => <Card setNotification={setNotification} locations={locations} data={el} status={status} />) : 'Loading...'}
                                    {data && data.length === 0 ?
                                        <div style={{ width: '100%', margin: '100px 0', textAlign: 'center' }}>
                                            <img src="/media/no-clients.png" style={{ width: '25%' }} />
                                            <h4 className="text-center">No Records Found!</h4>
                                        </div>
                                        : ''}
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
}
