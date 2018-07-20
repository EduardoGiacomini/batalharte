import React, { Component } from 'react';
// redux
import { Provider } from 'react-redux';
import store from './redux/store/store';
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
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
