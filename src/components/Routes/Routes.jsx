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
import Contents from '../Classroom/Content/Contents';
import Content from '../Classroom/Content/Content';
import Form from '../Classroom/Content/Form';
import Ranking from '../Classroom/Ranking/Ranking';
import NavigationClassroom from '../Classroom/NavigationClassroom/NavigationClassroom';

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
                </Switch>
                <Route path="/dashboard/:id" component={NavigationClassroom} />
                <Route exact path="/dashboard/:id/content" component={Contents} />
                <Route exact path="/dashboard/:id/content/:id" component={Content} />
                <Route exact path="/dashboard/:id/content/form" component={Form} />
                <Route exact path="/dashboard/:id/content/share" component={() => <h1>Share</h1>} />
                <Route exact path="/dashboard/:id/quiz" component={() => <h1>Página de quizzes</h1>} />
                <Route exact path="/dashboard/:id/ranking" component={Ranking} />
            </div>
        </BrowserRouter>
    );
}