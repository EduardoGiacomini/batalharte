import React from 'react';
// React-router-dom
import { Redirect } from 'react-router-dom';
// Firebase
import { firebase } from '../../firebase';
// Operator
import If from '../Operator/If';

const INITIAL_STATE = {
  isAuthenticated: true,
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount = () => {
    this.removeAuthListener = firebase.auth.onAuthStateChanged(user => {
      this.setState({ isAuthenticated: !!user })
    });
  };

  componentWillUnmount = () => {
    this.removeAuthListener();
  };

  render() {
    // State
    const {
      isAuthenticated
    } = this.state;

    return (
      <div>
        <div>
          <p>Bem vindo ao batalharte!</p>
        </div>
        <If test={!isAuthenticated}>
          <Redirect to="/" />
        </If>
      </div>
    );
  }
}

export default Dashboard;