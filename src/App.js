import React, { Component } from 'react';
// Firebase
import { firebase, database } from './firebase';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { doSignIn } from './redux/actions/authActions';
// Component-router
import Routes from './components/Routes/Routes';
// Material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// Default styles
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

  componentDidMount() {
    this.removeAuthListener = firebase.auth.onAuthStateChanged(user => {
      
      if (user) {
        const { uid } = user;

        database.doOnceGetUser(uid)
          .then((user) => {
            this.props.doSignIn(user);
          })
          .catch(() => {
            console.log('Ocorreu um erro durante a busca do usuário!');
          })
      }

    });
  };

  componentWillUnmount() {
    this.removeAuthListener();
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ doSignIn }, dispatch);

export default connect(null, mapDispatchToProps)(App);