import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card'
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles({
    bgColor: {
        backgroundColor: '#fff'
    }
});

export default function FeedbacksListing({ data, currentUser }) {
    const classes = useStyles();
    console.log(currentUser)
    let newData = [];
    if (currentUser.type === 'user') {
        newData = data.filter(el => el.userID === currentUser.id);
    } else if (currentUser.type === 'admin') {
        newData = data;
    }

    return (
        <div className="container py-5">
            <div className={`card card-custom`}>
                <div className={`card-header ${classes.bgColor}`}>
                    <h2 className="align-items-start flex-column mb-0" style={{ float: 'left' }}>Feedbacks</h2>
                    {currentUser.type === 'user' && newData.length > 0 &&
                        <Link to="/add-feedback"><Button variant="contained" color="primary" size="small" className="font-weight-bold mt-2" style={{ float: 'right' }}>Add Feedback</Button></Link>
                    }
                </div>

                <div className="card-body pt-0 py-4">
                    <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <Grid container spacing={5}>
                                {newData.length > 0 ?
                                    newData.map(el => <Card data={el} currentUser={currentUser} />)
                                    :
                                    <div style={{ width: '100%', margin: '100px 0', textAlign: 'center' }}>
                                        <img src="/media/no-clients.png" style={{ width: '25%' }} />
                                        <h4 className="text-center">No Records Found!</h4>
                                        {currentUser.type === 'user' &&
                                            <Link to="/add-feedback"><Button variant="contained" color="primary" className="font-weight-bold mt-2" >Add Feedback</Button></Link>
                                        }
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
