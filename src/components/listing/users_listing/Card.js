import React from "react";
import { Button } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#1840d2',
    color: '#1840d2',
    minWidth: '50%',
    float: 'right',
    marginTop: '7px'
  },
  border: {
    border: '1px solid #E4E6EF',
    boxShadow: '0px 0px 7px -3px #ccc',
    borderRadius: '10px',
    padding: '20px'
  }
}));

export default function Card({data}) {
  console.log({data});
  const classes = useStyles();

  // let formatedDate = '';
  // const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // formatedDate = new Date().toLocaleDateString(undefined, options);

  return (
    <>
      <Grid item xs={4}>
        <div className={classes.border}>
          <Grid container spacing={2} className="mb-4">
            <Grid item xs={4}>
              <Avatar className={classes.large} alt="profile pic">{data.initials}</Avatar>
            </Grid>
            {/* <Grid item xs={8}>
              <Button className={classes.button}>Make Inactive</Button>
            </Grid> */}
          </Grid>
          <p className="pt-7">Name: <span className="font-weight-bold">{`${data.firstName} ${data.lastName}`}</span></p>
          <p>Email: <span className="font-weight-bold">{data.email}</span></p>
          <p>Member Since: <span className="font-weight-bold">{data.createdAt}</span></p>
          <p>Type: <span className="font-weight-bold">{data.type}</span></p>
        </div>
      </Grid>
    </>
  );
}
