import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Header,
    Grid
} from 'semantic-ui-react';

import NavBarList from './NavBarList';

import './style.css';

function NavBar() {
    return (
        <nav id="NavBar">
            <Grid>
                <Grid.Column floated="left" width={5} className="navbar-left">
                    <Link to={'/'}><Header as="h1">FP Rankings</Header></Link>
                </Grid.Column>
                <Grid.Column floated="right" width={2} className="navbar-right">
                    <NavBarList />  
                </Grid.Column>
            </Grid>
        </nav>
    )
}

export default NavBar;
