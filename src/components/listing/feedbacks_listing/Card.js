import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { addFeedbackReply } from '../../../store/actions/parkingAction';
import { useFirestoreConnect } from "react-redux-firebase";

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
    padding: '20px',
    minHeight: '380px'
  },
  replies_border: {
    border: '1px dashed #ccc',
    borderRadius: '10px',
    minHeight: '100px'
  },
  replies_heading: {
    marginTop: '-10px',
    marginLeft: '-5px',
    padding: '0 5px',
    backgroundColor: '#fff',
    display: 'block',
    float: 'left',
    marginBottom: '8px'
  },
  reply_box: {
    padding: '6px 10px',
    backgroundColor: '#fbfbfb',
    borderRadius: '10px'
  },
  viewAll: {
    textAlign: 'right',
    margin: '-16px 16px 5px 0',
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '12px'
  },
  noComment: {
    // padding: '0px',
    textAlign: 'center',
    fontSize: '13px',
    display: 'block',
    float: 'left',
  },
  noCommentImg: {
    width: '100%'
  }
}));

export default function Card({ data, currentUser }) {
  console.log(currentUser);
  const classes = useStyles();
  const dispatch = useDispatch();
  useFirestoreConnect(['users']);
  const { firebase, firestore } = useSelector(state => state);
  const [reply, setReply] = useState({ value: '', error: false, helperText: '' });
  const [replyBox, setReplyBox] = useState(false);

  // let currentUser = null;
  // if (firestore.ordered.users !== undefined)
  //   currentUser = firestore.ordered.users.filter(el => el.id === firebase.auth.uid);

  const addNewFeedbackHandler = (e) => {
    e.preventDefault();
    setReply({ ...reply, error: false, helperText: '' })

    if (reply.value === "")
      setReply({ ...reply, error: true, helperText: 'This is required field!' })
    else {
      dispatch(addFeedbackReply({
        message: reply.value,
        fullName: `${currentUser.firstName} ${currentUser.lastName}`,
        initials: currentUser.initials,
        userID: firebase.auth.uid
      }, data.id, setReply));
    }
  }

  const goToCommentSectionHandler = () => {
    setReplyBox(true);
    setReply({ ...reply, error: false, helperText: '' })
  }

  const arrowStyle = {
    fontSize: "36px",
    color: "#909090",
    marginRight: "2px",
    padding: "7px",
    cursor: 'pointer',
  }
  return (
    <>
      <Grid item xs={4}>
        <div className={classes.border}>
          {!replyBox ?
            <>
              <Grid container spacing={2} className="mb-4">
                <Grid item xs={4}>
                  <Avatar className={classes.large} alt="profile pic">{data.initials}</Avatar>
                </Grid>
              </Grid>
              <p className="pt-7">Name: <span className="font-weight-bold">{data.fullName}</span></p>
              <p>Email: <span className="font-weight-bold">{data.email}</span></p>
              {/* <p>Feedback Date: <span className="font-weight-bold">{formatedDate}</span></p> */}
              <p>Feedback: <span className="font-weight-bold">{data.feedback}</span></p>
              <div className={classes.replies_border}>
                <p className={classes.replies_heading}>Latest Replies</p>
                {
                  data.replies.length > 0 ?
                    <>
                      <div style={{ padding: '0 15px' }}>
                        <Grid container className="mb-4">
                          <Grid item xs={3}>
                            <Avatar alt="profile pic">{data.replies.length > 0 && data.replies[data.replies.length - 1].initials}</Avatar>
                          </Grid>
                          <Grid xs={9}>
                            <div className={classes.reply_box}>
                              <b className="mb-0">{data.replies.length > 0 && (data.replies[data.replies.length - 1].userID === currentUser.id ? 'You' : data.replies[data.replies.length - 1].fullName)}</b>
                              <p className="mb-0">{data.replies.length > 0 && data.replies[data.replies.length - 1].message}</p>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                      <p className={classes.viewAll} onClick={goToCommentSectionHandler}>View All</p>
                    </>
                    :
                    <div className={classes.noComment}>
                      <div ><img src="/media/no-available.png" style={{ width: '45%', marginTop: '-6px' }} /></div>
                    </div>
                }
              </div>
              <Button fullWidth variant="contained" color="primary" size="small" className="font-weight-bold mt-2" onClick={goToCommentSectionHandler}>Reply</Button>
            </>
            :
            <>
              <div style={{ marginBottom: '10px', marginTop: '-10px' }} onClick={() => setReplyBox(false)}>
                <KeyboardBackspaceIcon style={arrowStyle} />
              </div>
              <div style={{height: '167px', overflowY: 'scroll'}}>
                {
                  data.replies.length > 0 ?
                    data.replies.map(el => {
                      return (
                        <Grid container className="mb-4">
                          <Grid item xs={3}>
                            <Avatar alt="profile pic">{el.initials}</Avatar>
                          </Grid>
                          <Grid xs={9}>
                            <div className={classes.reply_box}>
                              <b className="mb-0">{el.userID === currentUser.id ? 'You' : el.fullName}</b>
                              <p className="mb-0">{el.message}</p>
                            </div>
                          </Grid>
                        </Grid>
                      )
                    })
                    :
                    <div className={classes.noComment}>
                      <div ><img src="/media/no-available.png" style={{ width: '70%', marginTop: '-6px' }} /></div>

                      <h5 className="mt-3">No Reply Available</h5>
                    </div>

                }
              </div>

              <form noValidate onSubmit={addNewFeedbackHandler} style={{marginTop: '0'}}>
                <TextField
                  id="outlined-multiline-static"
                  label="Reply"
                  margin="normal"
                  multiline
                  required
                  fullWidth
                  rows={1}
                  variant="outlined"
                  value={reply.value}
                  onChange={e => setReply({ ...reply, value: e.target.value })}
                  error={reply.error}
                  helperText={reply.helperText}
                />
                <Button fullWidth variant="contained" color="primary" size="small" className="font-weight-bold mt-2" type="submit">Add Reply</Button>
              </form>
              <span>&nbsp;</span>
            </>
          }
        </div>
      </Grid>
    </>
  );
}
