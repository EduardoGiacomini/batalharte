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
import FormContent from '../Classroom/Content/Form';
import ShareContent from '../Classroom/Content/Share';
import Ranking from '../Classroom/Ranking/Ranking';
import Quizzes from '../Classroom/Quiz/Quizzes';
import FormQuiz from '../Classroom/Quiz/Form';
import CreateQuiz from '../Classroom/Quiz/Create';
import PlayQuiz from '../Classroom/Quiz/Play';
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
                <Route  path="/dashboard/sobre" component={About} />
                <Route path="/dashboard/:id" component={NavigationClassroom} />
                <Route exact path="/dashboard/:id/content" component={Contents} />
                <Route exact path="/dashboard/:id/content/view/:id" component={(props) => <Content {...props} />} />
                <Route exact path="/dashboard/:id/content/form" component={FormContent} />
                <Route exact path="/dashboard/:id/content/share" component={ShareContent} />
                <Route exact path="/dashboard/:id/quizzes" component={Quizzes} />
                <Route exact path="/dashboard/:id/quizzes/form" component={FormQuiz} />
                <Route exact path="/dashboard/:id/quizzes/create" component={CreateQuiz} />
                <Route exact path="/dashboard/:id/quizzes/:id" component={PlayQuiz} />
                <Route exact path="/dashboard/:id/ranking" component={Ranking} />
            </div>
        </BrowserRouter>
    );
}