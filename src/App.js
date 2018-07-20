import React, { Component } from 'react';
// firebase
import firebase from './firebase/firebase';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import { signIn } from './redux/actions/authActions';
// component-router
import Routes from './components/Routes/Routes';
// material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// styles
import './styles/index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3E2723',
    },
    secondary: {
      main: '#EFEBE9',
    },
  },
});

class App extends Component {

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {

      if (user) {
        firebase.database().ref('users').child(user.uid).once('value', snapshot => {
          this.props.signIn(snapshot.val());
        });
      }

    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch);

export default connect(null, mapDispatchToProps)(App);

