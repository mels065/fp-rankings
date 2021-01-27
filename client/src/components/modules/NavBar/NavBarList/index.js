import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import {
    List
} from 'semantic-ui-react';

import { AuthContext } from '../../../../context/auth';

import './style.css';

function NavBarList() {
    const location = useLocation();
    const history = useHistory();
    const context = useContext(AuthContext);

    function logoutHandler(event) {
        event.preventDefault();
        context.logout();
        if (location.pathname !== '/') {
            history.push('/');
        }
    } 
    return (
        <List horizontal className="nav-bar-list">
            {
                context.isLoggedIn ?
                    (
                        <React.Fragment>
                            <List.Item>
                                <Link to="/rankings">Rankings</Link>
                            </List.Item>
                            <List.Item>
                                <Link to="/logout" onClick={logoutHandler}>Logout</Link>
                            </List.Item>
                        </React.Fragment>
                    ) :
                    (
                        <List.Item>
                            <Link to="/login-register">Login/Register</Link>
                        </List.Item>
                    )
            }
        </List>
    )
}

export default NavBarList;
