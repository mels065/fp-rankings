import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

function ProtectedRoute({ path, component }) {
    return AuthContext.user ?
        <Route path={path}>
            <component />
        </Route> :
        <Redirect path="/" />
}

export default ProtectedRoute;
