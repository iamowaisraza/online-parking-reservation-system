import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '50%',
        textAlign: 'center',
        justifyContent: "center"

    },
    image: {
        backgroundImage: "url('/media/slots.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        margin: '-16px',
        height: '480px'
    },
    buttonsRow: {
        width: '100%',
        marginTop: '150px',
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    
}));

export default function BookingSlots({ addSlotHandler, currentLocationSlots, selectSlotHandler, reservedSlots }) {
    console.log('reservedSlots', reservedSlots)
    const classes = useStyles();
    const arrowStyle = {
        fontSize: "36px",
        color: "#909090",
        backgroundColor: "#fbfbfb",
        borderRadius: "50%",
        marginRight: "2px",
        padding: "7px"
    }
    return (
        <div className={classes.image}>
            <div style={{padding: '10px 0 0px 3px', cursor: 'pointer'}} onClick={() => addSlotHandler(false)}>
                <KeyboardBackspaceIcon style={arrowStyle} />
            </div>
            <div className={classes.buttonsRow}>
                {
                    currentLocationSlots.map(el => {
                        return (<Button variant="contained" color="primary" key={el.id} id={el.id} name={el.slot} onClick={selectSlotHandler} disabled={reservedSlots.includes(el.id)}>{reservedSlots.includes(el.id) ? "Reserved" : "Select"}</Button>)
                    })
                }
            </div>
        </div>
    );
}