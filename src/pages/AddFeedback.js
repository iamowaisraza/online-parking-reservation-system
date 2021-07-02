import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ShowNotification from "../components/modules/ShowNotification";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { addFeedback } from '../store/actions/parkingAction';
import { useFirestoreConnect } from 'react-redux-firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AddFeedback() {
    const classes = useStyles();
    const dispatch = useDispatch();
    useFirestoreConnect(['users']);
    const { firebase, firestore } = useSelector(state => state);
    const [feedback, setFeedback] = useState({ value: '', error: false, helperText: '' });
    const [notification, setNotification] = useState({ show: false, msg: '', variant: '' });

    let currentUser = null;
    if (firestore.ordered.users !== undefined)
        currentUser = firestore.ordered.users.filter(el => el.id === firebase.auth.uid);

    const handleSubmit = e => {
        e.preventDefault();
        setFeedback({ ...feedback, error: false, helperText: '' })

        if (feedback.value === "")
            setFeedback({ ...feedback, error: true, helperText: 'This is required field!' })
        else {
            dispatch(addFeedback({
                userID: firebase.auth.uid,
                message: feedback.value,
                fullName: `${currentUser[0].firstName} ${currentUser[0].lastName}`,
                initials: currentUser[0].initials,
                email: currentUser[0].email
            }, setNotification, setFeedback));
        }
    }

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') return;
        setNotification({ show: false, msg: '', variant: '' });
    }

    // if (!(currentUser && currentUser[0].type === 'user')) return <Redirect to="/" />

    if (!firebase.auth.uid) return <Redirect to="/login" />

    return (
        <>
            {notification.show && <ShowNotification show={notification.show} msg={notification.msg} variant={notification.variant} close={handleCloseNotification} />}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FeedbackIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Feedback
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Feedback"
                            multiline
                            required
                            fullWidth
                            rows={4}
                            variant="outlined"
                            value={feedback.value}
                            onChange={e => setFeedback({ ...feedback, value: e.target.value })}
                            error={feedback.error}
                            helperText={feedback.helperText}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add Feedback
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    );
}