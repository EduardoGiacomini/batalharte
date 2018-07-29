import React from 'react';
import PropTypes from 'prop-types';
// react-router-dom
import { Redirect } from 'react-router-dom';
// firebase
import firebase from '../../firebase/firebase';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import StarIcon from '@material-ui/icons/Star';
// components
import Quiz from '../Quiz/Quiz';
import Ranking from '../Ranking/Ranking';
// operator
import If from '../Operator/If';

const styles = {
  root: {
    width: '100%',
  },
};

class Navigation extends React.Component {
  state = {
    isAuthenticated: true,
    value: 0,
  };

  componentDidMount = () => {
    this.authRef = firebase.auth().onAuthStateChanged(user => this.setState({ isAuthenticated: !!user }));
  }

  componentWillUnmount = () => {
    this.authRef();
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated, value } = this.state;

    return (
      <div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Conteúdos" icon={<BookIcon />} />
          <BottomNavigationAction label="Ranking" icon={<StarIcon />} />
        </BottomNavigation>
        <If test={value === 0}>
          <Quiz />
        </If>
        <If test={value === 1}>
          <div>
            <h2>Conteúdos</h2>
          </div>
        </If>
        <If test={value === 2}>
          <Ranking />
        </If>
        <If test={!isAuthenticated}>
          <Redirect to="/" />
        </If>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);