import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import StarIcon from '@material-ui/icons/Star';

const styles = {
    root: {
      width: '100%',
    },
  };
  
  class Navigation extends React.Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
  
      return (
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
      );
    }
  }
  
Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Navigation);