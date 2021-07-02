import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useReactToPrint } from "react-to-print";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import { cancelParking } from "../../../store/actions/parkingAction";
import { Modal } from 'react-bootstrap';
import moment from "moment";
import PrintFile from "./PrintFile";


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  image: {
    width: '115%',
    height: '200px',
    marginTop: '-20px',
    marginLeft: '-20px',
    marginBottom: '20px',
    borderRadius: '10px 10px 0 0'
  },
  border: {
    border: '1px solid #E4E6EF',
    boxShadow: '0px 0px 7px -3px #ccc',
    borderRadius: '10px',
    padding: '20px'
  },
  para: {
    marginBottom: '0.5rem'
  }
}));

export default function Card({ locations, data, status, setNotification }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState({ title: '', msg: '' });

  let formatedDate = '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  formatedDate = new Date().toLocaleDateString(undefined, options);

  let coverImage = locations.filter(el => el.id === data.locationID);

  const cancelBookingHandler = e => {
    setShowConfirmation(false)
    dispatch(cancelParking(e.currentTarget.id, setNotification));
  }

  const pdfExportComponent = useRef(null);

  const downloadHandler = event => {
    pdfExportComponent.current.save();
  };

  const deleteConfirmationHandler = status => {
    if (status === 'delete') {
      setConfirmationMsg({ title: 'Delete Record Confirmation', msg: 'This will permanently delete your booking record. Do you want to proceed?' });
    } else {
      setConfirmationMsg({ title: 'Cancel Reservation Confirmation', msg: 'This will permanently cancel your reservation. Do you want to proceed?' });

    }
    setShowConfirmation(true);
  }

  let now = Date.parse(new Date());
  let stime = Date.parse(data.startTime);
  let etime = Date.parse(data.endTime);

  let printObj = {
    cname: data.bookerName,
    stime: moment(data.startTime).format("ddd, hA"),
    etime: moment(data.endTime).format("ddd, hA"),
    date: moment(data.startTime).format('YYYY-MM-DD'),
    slot: data.slotName,
    duration: data.duration,
    location: coverImage[0].title,
    invoiceNo: Math.floor(Math.random() * 9999)
  }
  return (
    <>
      <Grid item xs={4}>
        <div className={classes.border}>
          <img src={coverImage[0].image} className={classes.image} />
          <p className={classes.para}>Booking ID: <span className="font-weight-bold">{data.id}</span></p>
          <p className={classes.para}>Date: <span className="font-weight-bold">{moment(data.startTime).format('YYYY-MM-DD')}</span></p>
          <p className={classes.para}>Start Time: <span className="font-weight-bold">{moment(data.startTime).format("ddd, hA")}</span></p>
          <p className={classes.para}>End Time: <span className="font-weight-bold">{moment(data.endTime).format("ddd, hA")}</span></p>
          <p className={classes.para}>Parking Slot: <span className="font-weight-bold">{data.slotName}</span></p>
          <p className={classes.para}>Location: <span className="font-weight-bold">{coverImage[0].title}</span></p>
          <p className={classes.para}>Booked On: <span className="font-weight-bold">{data.createdAt}</span></p>
          {
            now < stime ?
              status === "my" &&
              <>
                <Button fullWidth variant="contained" color="primary" size="small" className="font-weight-bold mt-2" onClick={handlePrint}>Print Receipt</Button>
                <Button fullWidth variant="contained" color="secondary" size="small" className="font-weight-bold mt-2" onClick={() => deleteConfirmationHandler('cancel')}>Cancel Booking</Button>
              </>
              :
              <>
                <Button fullWidth variant="contained" color="secondary" size="small" className="font-weight-bold mt-2" disabled={true}>Expired</Button>
                <Button fullWidth variant="contained" color="secondary" size="small" className="font-weight-bold mt-2" onClick={() => deleteConfirmationHandler('delete')}>Delete Record</Button>
              </>
          }

        </div>
      </Grid>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{confirmationMsg.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmationMsg.msg}</Modal.Body>
        <Modal.Footer>
          <Button color="secondary" variant="contained" onClick={() => setShowConfirmation(false)} className="mr-3">
            No
          </Button>
          <Button color="primary" variant="contained" id={data.id} onClick={cancelBookingHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{display: 'none'}}><PrintFile ref={componentRef} data={printObj} /></div>
    </>
  );
}
