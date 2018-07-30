import React from 'react';
// react-router-dom
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// components
import AppBar from '../Common/AppBar/AppBar';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';
import RetrieveAccess from '../Auth/RetrieveAccess/RetrieveAccess';
import About from '../About/About';
import Dashboard from '../Dashboard/Dashboard';
import Quiz from '../Quiz/Quiz';

export default props => {
    return (
        <BrowserRouter>
            <div>
                <AppBar />
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route exact path="/cadastrar-se" component={SignUp} />
                    <Route exact path="/recuperaracesso" component={RetrieveAccess} />
                    <Route exact path="/sobre" component={About} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route path="/praticar/:uid" component={Quiz} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}