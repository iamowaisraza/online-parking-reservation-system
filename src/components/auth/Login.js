import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ShowNotification from "../modules/ShowNotification";
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from "react-router-dom";

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

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState({ email: '', error: false, helperText: '' });
    const [password, setPassword] = useState({ password: '', error: false, helperText: '' });
    const [notification, setNotification] = useState({ show: false, msg: '', variant: '' });

    const { firebase } = useSelector(state => state);

    const handleSubmit = e => {
        e.preventDefault();
        setEmail({ ...email, error: false, helperText: '' })
        setPassword({ ...password, error: false, helperText: '' })

        if (email.email === "")
            setEmail({ ...email, error: true, helperText: 'This is required field!' })

        if (password.password === "")
            setPassword({ ...password, error: true, helperText: 'This is required field!' })

        if (email.email !== "" && !validator.isEmail(email.email))
            setEmail({ ...email, error: true, helperText: 'Invalid Email' })

        if (email.email !== "" && password.password !== "") {
            dispatch(signIn(email.email, password.password, setNotification));
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
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setEmail({ ...email, email: e.target.value })}
                            error={email.error}
                            helperText={email.helperText}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
}