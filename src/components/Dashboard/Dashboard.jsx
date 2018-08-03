import React from 'react';
// react-router-dom
import { Redirect } from 'react-router-dom';
// firebase
import firebase from '../../firebase/firebase';
//redux
import { connect } from 'react-redux';
// Operator
import If from '../Operator/If';
// Components
import Classrooms from '../Classrooms/Classrooms';
import Loading from '../Loading/Loading';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: true,
    };
  }

  componentDidMount = () => {
    this.authRef = firebase.auth().onAuthStateChanged(user => this.setState({ isAuthenticated: !!user }));
  }

  componentWillUnmount = () => {
    this.authRef();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { user } = this.props;

    return (
      <div>
        {
          user ?
            <Classrooms />
            :
            <Loading />
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