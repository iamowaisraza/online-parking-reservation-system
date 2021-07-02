import { makeStyles } from '@material-ui/core/styles';
import Card from './Card'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    bgColor: {
        backgroundColor: '#fff'
    }
});
export default function UsersListing({ data }) {
    console.log('yes data', data)
    const classes = useStyles();
    return (
        <div className="container py-5">
            <div className={`card card-custom`}>
                <div className={`card-header ${classes.bgColor}`}>
                    <h2 className="align-items-start flex-column mb-0">Users</h2>
                </div>

                <div className="card-body pt-0 py-4">
                    <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <Grid container spacing={5}>
                                {data.map(el => <Card data={el} />)}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
