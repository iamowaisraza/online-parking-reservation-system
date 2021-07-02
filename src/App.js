import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import UserDashboard from './pages/UserDashboard';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import ViewUsers from './pages/ViewUsers';
import AddFeedback from './pages/AddFeedback';
import ViewBookings from './pages/ViewBookings';
import { useSelector } from "react-redux";
import ViewFeedbacks from "./pages/ViewFeedbacks";
import AddUser from "./pages/AddUser";
import ViewAllBookings from "./pages/ViewAllBookings";
import Header from "./components/dashboard/Header";
// import PublicRoute from './routes/PublicRoute';
// import PrivateRoute from './routes/PrivateRoute';

function App() {
  const { firestore, firebase } = useSelector(state => state);

  let auth = firebase.auth.uid ? true : false;
  let currentUser = null;
  if (firebase.auth.uid !== undefined && firestore.ordered.users !== undefined)
    currentUser = firestore.ordered.users.filter(el => el.id === firebase.auth.uid);
  return (
    <>
      <Router>
        {firebase.auth.uid && <Header />}
        <Switch>
          <Route exact path="/" component={UserDashboard} exact/>
          <Route component={Login} path="/login" />
          <Route component={Registration} path="/signup" />
          <Route path="/my-bookings" component={ViewBookings} />
          <Route path="/add-feedback" component={AddFeedback} />
          <Route path="/add-user" component={AddUser} />
          <Route path="/view-feedbacks" component={ViewFeedbacks} />
          <Route path="/view-bookings" component={ViewAllBookings} />
          <Route path="/show-users" component={ViewUsers} />

          {/* <PublicRoute restricted={true} component={Login} path="/login" auth={auth} exact />
          <PublicRoute restricted={true} component={Registration} path="/signup" auth={auth} exact />
          <PrivateRoute exact path="/" component={UserDashboard} auth={auth} />
          <PrivateRoute path="/my-bookings" component={ViewBookings} auth={auth} />
          <PrivateRoute path="/add-feedback" component={AddFeedback} auth={auth} />
          <PrivateRoute path="/add-user" component={AddUser} auth={auth} />
          <PrivateRoute path="/view-feedbacks" component={ViewFeedbacks} auth={auth} />
          <PrivateRoute path="/view-bookings" component={ViewAllBookings} auth={auth} />
          <PrivateRoute path="/show-users" component={ViewUsers} auth={auth} /> */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
