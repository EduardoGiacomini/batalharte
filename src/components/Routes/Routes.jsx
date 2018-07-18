import React from 'react';
// react-router-dom
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// components
import Welcome from '../Welcome/Welcome';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';

export default props => {
    return (
        <div>
            <BrowserRouter>
                    <Switch>
                        <Route exact={true} path='/' component={Welcome} />
                        <Route exact={true} path='/signin' component={SignIn} />
                        <Route exact={true} path='/signup' component={SignUp} />
                    </Switch>
            </BrowserRouter>
        </div>
    );
}