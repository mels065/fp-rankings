import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

function ProtectedRoute({ path, children }) {
    const context = useContext(AuthContext);
    if (context.isLoggedIn) {
        return (
            <Route path={path}>
                {children}
            </Route>
        )
    } else {
        return (
            <Redirect to="/" />
        )
    }
}

export default ProtectedRoute;
