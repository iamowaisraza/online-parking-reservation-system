import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from '@material-ui/icons/Add';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '50%',
        textAlign: 'center',
        justifyContent: "center"

    },
}));

export default function BookingForm({ date, setDate, time, setTime, duration, setDuration, slotNo, renderSlots, addParkingHandler }) {
    const classes = useStyles();
    let newHoursArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if(time.value !== ''){
        newHoursArray = [];
        let remainingHours = 21 - time.value;
        for (let i = 1; i <= remainingHours; i++)
            newHoursArray.push(i);
    }
    const [hoursArray, setHoursArray] = useState(newHoursArray)
    const time24Array = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const time12Array = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

    const selectTimeHandler = e => {
        let selectedHours = e.target.value;
        let remainingHours = 21 - selectedHours;
        let newHoursArray = [];
        for (let i = 1; i <= remainingHours; i++)
            newHoursArray.push(i);
        setDuration({ ...duration, value: '' })
        setHoursArray(newHoursArray);
        setTime({ ...time, value: selectedHours });
    }

    return (
        <>
            <TextField
                variant="outlined"
                margin="normal"
                type="date"
                required
                label="Select Date"
                name="date"
                autoFocus
                style={{ width: '49%', marginRight: '2%', float: 'left' }}
                value={date.value}
                onChange={e => setDate({ ...date, value: e.target.value })}
                error={date.error}
                helperText={date.helperText}
                inputProps={{
                    min: moment().format('YYYY-MM-DD')
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                select
                label="Start Time"
                margin="normal"
                style={{ width: '49%' }}
                variant="outlined"
                value={time.value}
                onChange={e => selectTimeHandler(e)}
                error={time.error}
                helperText={time.helperText}
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {
                    time24Array.map((el, i) => <MenuItem key={el} value={el}>{time12Array[i]}</MenuItem>)
                }
            </TextField>
            <TextField
                id="outlined-select-currency"
                select
                label="Time Duration"
                margin="normal"
                style={{ width: '49%', marginRight: '2%' }}
                variant="outlined"
                value={duration.value}
                onChange={e => setDuration({ ...duration, value: e.target.value })}
                error={duration.error}
                helperText={duration.helperText}
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {
                    hoursArray.map(el => <MenuItem key={el} value={el}>{el} hr</MenuItem>)
                }
            </TextField>
            <TextField
                variant="outlined"
                margin="normal"
                disabled
                required
                style={{ width: '49%' }}
                label="Parking Slot"
                name="slot"
                autoFocus
                value={slotNo.value}
                error={slotNo.error}
                helperText={slotNo.helperText}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <AddIcon onClick={renderSlots} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className="text-center">
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={addParkingHandler}
                >
                    Submit
                </Button>
            </div>
        </>
    );
}