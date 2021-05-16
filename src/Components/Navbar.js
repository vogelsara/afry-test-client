import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Button color='inherit' component={Link} to='/'>Add person</Button>
                    <Button color='inherit' component={Link} to='/companies'>Manage companies</Button>
                    <Button color='inherit' component={Link} to='/people'>People without company</Button>
                </Toolbar>
            </AppBar>
        )
    }
}
