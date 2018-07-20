import React, { Component } from 'react';
// react-router-dom
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// components
import AppBar from '../Common/AppBar/AppBar';
import Welcome from '../Welcome/Welcome';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = { auth: true };
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <AppBar auth={this.state} />
                    <Switch>
                        <Route exact={true} path='/' component={Welcome} />
                        <Route exact={true} path='/signin' component={SignIn} />
                        <Route exact={true} path='/signup' component={SignUp} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Routes;