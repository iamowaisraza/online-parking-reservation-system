import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/actions/authActions';
import { Redirect } from "react-router-dom";
import validator from 'validator';
import ShowNotification from "../modules/ShowNotification";

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Registration() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState({ email: '', error: false, helperText: '' });
    const [password, setPassword] = useState({ password: '', error: false, helperText: '' });
    const [fname, setFname] = useState({ fname: '', error: false, helperText: '' });
    const [lname, setLname] = useState({ lname: '', error: false, helperText: '' });
    const [notification, setNotification] = useState({ show: false, msg: '', variant: '' });

    const { firebase } = useSelector(state => state);

    const handleSubmit = e => {
        e.preventDefault();
        setEmail({ ...email, error: false, helperText: '' })
        setPassword({ ...password, error: false, helperText: '' })
        setFname({ ...fname, error: false, helperText: '' })
        setLname({ ...lname, error: false, helperText: '' })

        if (email.email === "")
            setEmail({ ...email, error: true, helperText: 'This is required field!' })

        if (password.password === "")
            setPassword({ ...password, error: true, helperText: 'This is required field!' })

        if (fname.fname === "")
            setFname({ ...fname, error: true, helperText: 'This is required field!' })

        if (lname.lname === "")
            setLname({ ...lname, error: true, helperText: 'This is required field!' })

        if (email.email !== "" && !validator.isEmail(email.email))
            setEmail({ ...email, error: true, helperText: 'Invalid Email' })

        if (email.email !== "" && password.password !== "" && fname.fname !== "" && lname.lname !== "") {
            let user = {
                fname: fname.fname,
                lname: lname.lname,
                email: email.email,
                password: password.password,
                type: 'user'
            }
            dispatch(signup(user, setNotification));
        }
    }

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') return;
        setNotification({ show: false, msg: '', variant: '' });
    }

    if (firebase.auth.uid) return <Redirect to="/" />
    return (
        <>
            {notification.show && <ShowNotification show={notification.show} msg={notification.msg} variant={notification.variant} close={handleCloseNotification} />}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={e => setFname({ ...fname, fname: e.target.value })}
                                    error={fname.error}
                                    helperText={fname.helperText}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={e => setLname({ ...lname, lname: e.target.value })}
                                    error={lname.error}
                                    helperText={lname.helperText}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={e => setEmail({ ...email, email: e.target.value })}
                                    error={email.error}
                                    helperText={email.helperText}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={e => setPassword({ ...password, password: e.target.value })}
                                    error={password.error}
                                    helperText={password.helperText}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
}