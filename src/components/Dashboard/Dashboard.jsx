import React from 'react';
// React-router-dom
import { Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Firebase
import { firebase } from '../../firebase';
// Operator
import If from '../Operator/If';
// Components
import Loading from '../Loading/Loading';
import List from '../Classroom/List';

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
      isAuthenticated,
    } = this.state;

    // Props
    const {
      user,
    } = this.props;

    return (
      <div>
        {
          user ? <List /> : <Loading />
        }
        <If test={!isAuthenticated}>
          <Redirect to="/" />
        </If>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, null)(Dashboard);