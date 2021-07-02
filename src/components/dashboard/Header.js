import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { useFirestoreConnect } from 'react-redux-firebase';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
        margin: '0 50px'
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    logo: {
        width: '13%',
        marginTop: '10px',
        marginBottom: '10px'
    }
}));


export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }
    useFirestoreConnect(['users'])
    const { firestore, firebase } = useSelector(state => state);

    let currentUser = null;
    if (firestore.ordered.users !== undefined)
        currentUser = firestore.ordered.users.filter(el => el.id === firebase.auth.uid);
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        <Link href="/"><img src="/media/logo.png" alt="logo" className={classes.logo} /></Link>
                    </Typography>

                    {
                        currentUser !== null && currentUser.length > 0 ?
                            currentUser[0].type === "admin" ?
                                <nav>
                                    <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                                        Book Parking
                                    </Link>
                                    <Link variant="button" color="textPrimary" href="/my-bookings" className={classes.link}>
                                        My Bookings
                                    </Link>
                                    <Link variant="button" color="textPrimary" href="/add-user" className={classes.link}>
                                        Add User
                                    </Link>
                                    <Link variant="button" color="textPrimary" href="/view-bookings" className={classes.link}>
                                        All Bookings
                                    </Link>
                                    <Link variant="button" color="textPrimary" href="/show-users" className={classes.link}>
                                        All Users
                                    </Link>
                                    <Link variant="button" color="textPrimary" href="/view-feedbacks" className={classes.link}>
                                        View Feedback
                                    </Link>
                                </nav>
                                :
                                <nav>
                                    <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                                        Book Parking
                                    </Link>
                                    <Link variant="button" color="textPrimary" href="/my-bookings" className={classes.link}>
                                        View Booking
                                    </Link>
                                    <Link variant="button" color="textPrimary" href="/view-feedbacks" className={classes.link}>
                                        Feedbacks
                                    </Link>
                                </nav>
                            :
                            ""
                    }

                    <Button onClick={logoutHandler} color="primary" variant="outlined" className={classes.link}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    );
}