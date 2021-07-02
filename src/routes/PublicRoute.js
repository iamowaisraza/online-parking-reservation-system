import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, auth, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            auth && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;