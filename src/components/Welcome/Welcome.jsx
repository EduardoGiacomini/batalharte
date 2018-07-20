import React, { Component } from 'react';
// react-router-dom
import { Redirect } from 'react-router-dom'
// firebase
import firebase from '../../firebase/firebase';
// operator
import If from '../Operator/If';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => this.setState({ isAuthenticated: !!user }));
    }

    render() {
        const { isAuthenticated } = this.state;
        return (
            <div>
                <h2>
                    Interface de boas vindas! Dev branch
            </h2>
                <If test={isAuthenticated}>
                    <Redirect to="/dashboard" />
                </If>
            </div>
        );
    }
}

export default Welcome;