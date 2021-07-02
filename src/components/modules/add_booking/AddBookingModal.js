import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import BookingForm from './BookingForm';
import BookingSlots from './BookingSlots';
import { addParking } from '../../../store/actions/parkingAction';
import moment from 'moment';
import ShowNotification from "../../../components/modules/ShowNotification";

export default function AddBookingModal({ show, setShow, locationID }) {
    const dispatch = useDispatch();
    useFirestoreConnect(['slots', 'bookings']);
    const { firestore, firebase } = useSelector(state => state);
    const [date, setDate] = useState({ value: '', error: false, helperText: '' });
    const [time, setTime] = useState({ value: '', error: false, helperText: '' });
    const [duration, setDuration] = useState({ value: '', error: false, helperText: '' });
    const [slotNo, setSlotNo] = useState({ value: '', id: '', error: false, helperText: '' });
    const [showSlots, setShowSlots] = useState(false);
    const [currentLocationSlots, setCurrentLocationSlots] = useState([]);
    const [reservedSlots, setReservedSlots] = useState([]);
    const [notification, setNotification] = useState({ show: false, msg: '', variant: '' });

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') return;
        setNotification({ show: false, msg: '', variant: '' });
    }

    const addSlotHandler = value => {
        setShowSlots(value);
    }

    const selectSlotHandler = e => {
        setSlotNo({ ...slotNo, value: e.currentTarget.name, id: e.currentTarget.id })
        setShowSlots(false);
    }

    const fieldsValidation = (from, msg) => {
        setDate({ ...date, error: false, helperText: '' })
        setTime({ ...time, error: false, helperText: '' })
        setDuration({ ...duration, error: false, helperText: '' })
        setSlotNo({ ...slotNo, error: false, helperText: '' })

        if (date.value === "")
            setDate({ ...date, error: true, helperText: msg })

        if (time.value === "")
            setTime({ ...time, error: true, helperText: msg })

        if (duration.value === "")
            setDuration({ ...duration, error: true, helperText: msg })

        if (from === 'submit' && slotNo.value === "")
            setSlotNo({ ...slotNo, error: true, helperText: msg })
    }

    const renderSlots = () => {
        fieldsValidation('render slot', 'Please fill this field to select a slot!');
        if (date.value !== "" && time.value !== "" && duration.value !== "") {
            let sameLocationBookings = firestore.ordered.bookings.filter(el => el.locationID === locationID);
            let parkingStartTime = moment(`${date.value} ${time.value}:00`).toString();
            let parkingEndTime = moment(parkingStartTime).add(duration.value, "h").toString();
            let allSlots = JSON.parse(JSON.stringify(currentLocationSlots));
            let bookedSlots = [];

            let m = moment(`${date.value} ${time.value}:00`);
            let currDate = moment(new Date());
            let checkPast = m.diff(currDate);
            let onlyDate = m.format('MM/DD/YYYY');
            if (checkPast > 0) {
                sameLocationBookings.map(el => {
                    let bookedSTime = Date.parse(el.startTime);
                    let bookedETime = Date.parse(el.endTime);

                    let givenSdate = Date.parse(parkingStartTime);
                    let givenEdate = Date.parse(parkingEndTime);

                    if (((givenSdate > bookedSTime) && (givenSdate < bookedETime)) || ((givenEdate > bookedSTime) && (givenEdate < bookedETime)) || (givenSdate == bookedSTime) || (givenEdate == bookedETime) || ((givenSdate < bookedSTime) && (givenEdate > bookedETime))) {
                        allSlots.map(slot => {
                            if (slot.id === el.slotID) {
                                bookedSlots.push(slot.id);
                            }
                        })
                        setCurrentLocationSlots(allSlots);
                    }
                })
                setReservedSlots(bookedSlots);
                addSlotHandler(true);
            } else {
                setNotification({ show: true, msg: 'Please select future date!', variant: 'error' })
            }
        }
    }

    const clearAll = () => {
        setSlotNo({ value: '', id: '', error: false, helperText: '' });
        setDate({ value: '', error: false, helperText: '' })
        setTime({ value: '', error: false, helperText: '' })
        setDuration({ value: '', error: false, helperText: '' })
        setTimeout(() => {
            setShow(false)
        }, 1000)
    }

    const addParkingHandler = () => {
        fieldsValidation('submit', 'This is required field!');

        if (date.value !== "" && time.value !== "" && duration.value !== "" && slotNo.value !== "") {
            let currentUser = null;
            if (firestore.ordered.users !== undefined)
                currentUser = firestore.ordered.users.filter(el => el.id === firebase.auth.uid);

            let m = moment(`${date.value} ${time.value}:00`);
            let currDate = moment(new Date());
            let checkPast = m.diff(currDate);
            let onlyDate = m.format('MM/DD/YYYY');
            if (checkPast > 0) {
                let parkingStartTime = m.toString();
                let parkingEndTime = moment(parkingStartTime).add(duration.value, "h");
                parkingEndTime = parkingEndTime.toString();

                let bookingObj = {
                    userID: firebase.auth.uid,
                    bookerName: currentUser !== null ? `${currentUser[0].firstName} ${currentUser[0].lastName}` : 'N/A',
                    date: onlyDate,
                    startTime: moment(parkingStartTime).toISOString(true),
                    endTime: moment(parkingEndTime).toISOString(true),
                    duration: duration.value,
                    slotID: slotNo.id,
                    slotName: slotNo.value,
                    locationID: locationID,
                    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
                }

                dispatch(addParking(bookingObj, setNotification, clearAll));
            } else {
                setNotification({ show: true, msg: 'Please select future date!', variant: 'error' })
            }
        }
    }

    useEffect(() => {
        if (firestore.ordered.slots !== undefined) {
            let slots = firestore.ordered.slots.filter(el => el.locationID === ` ${locationID}`);
            setCurrentLocationSlots(slots);
        }
    }, [firestore.ordered.slots]);

    return (
        <>
            {notification.show && <ShowNotification show={notification.show} msg={notification.msg} variant={notification.variant} close={handleCloseNotification} />}
            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Reserve New Parking Slot
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        firestore.ordered.bookings !== undefined ?
                            showSlots ?
                                <BookingSlots addSlotHandler={addSlotHandler} reservedSlots={reservedSlots} currentLocationSlots={currentLocationSlots} selectSlotHandler={selectSlotHandler} />
                                :
                                <BookingForm
                                    addParkingHandler={addParkingHandler}
                                    renderSlots={renderSlots}
                                    date={date}
                                    setDate={setDate}
                                    time={time}
                                    setTime={setTime}
                                    duration={duration}
                                    setDuration={setDuration}
                                    slotNo={slotNo}
                                />
                            :
                            <p>Loading...</p>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}